import { NextRequest, NextResponse } from 'next/server';
import { setAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
      await setAuthenticated();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'パスワードが正しくありません' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'エラーが発生しました' },
      { status: 500 }
    );
  }
}
