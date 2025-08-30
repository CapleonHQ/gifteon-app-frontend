import { MongoClient, Db, InsertOneResult, ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_DB || 'giftseon'

// Types
interface WaitlistEmail {
  email: string
  createdAt: Date
  ipAddress: string
  userAgent: string
}

interface WaitlistResponse {
  success: boolean
  message: string
  id?: ObjectId
}

interface ErrorResponse {
  error: string
}

// Connection caching
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()

  const db = client.db(MONGODB_DB)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<WaitlistResponse | ErrorResponse>> {
  try {
    const body = await request.json()
    const { email }: { email: string } = body

    // Email validation with regex for better accuracy
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const collection = db.collection<WaitlistEmail>('emails')

    // Check if email already exists
    const existingEmail = await collection.findOne({
      email: email.toLowerCase(),
    })
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Prepare email document
    const emailDoc: WaitlistEmail = {
      email: email.toLowerCase().trim(),
      createdAt: new Date(),
      ipAddress:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    }

    // Save email to database
    const result: InsertOneResult = await collection.insertOne(emailDoc)

    return NextResponse.json(
      {
        success: true,
        message: 'Email added to waitlist successfully',
        id: result.insertedId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Database connection failed' },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
