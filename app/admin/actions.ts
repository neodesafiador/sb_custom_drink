'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isAuthenticated, setAuthenticated, clearAuthentication } from '@/lib/auth';

export async function login(formData: FormData) {
  const password = formData.get('password') as string;

  if (password === process.env.ADMIN_PASSWORD) {
    await setAuthenticated();
    redirect('/admin/dashboard');
  } else {
    return { error: 'パスワードが正しくありません' };
  }
}

export async function logout() {
  await clearAuthentication();
  redirect('/admin');
}

export async function createDrink(formData: FormData) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return { error: '認証が必要です' };
  }

  const category = formData.get('category') as string;
  const name = formData.get('name') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const customExamples = formData.get('customExamples') as string;

  if (!category || !name || !imageUrl || !customExamples) {
    return { error: 'すべてのフィールドを入力してください' };
  }

  await prisma.drink.create({
    data: {
      category,
      name,
      imageUrl,
      customExamples,
    },
  });

  revalidatePath('/admin/dashboard');
  revalidatePath(`/menu/${category}`);
  return { success: true };
}

export async function updateDrink(id: string, formData: FormData) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return { error: '認証が必要です' };
  }

  const category = formData.get('category') as string;
  const name = formData.get('name') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const customExamples = formData.get('customExamples') as string;

  if (!category || !name || !imageUrl || !customExamples) {
    return { error: 'すべてのフィールドを入力してください' };
  }

  const drink = await prisma.drink.findUnique({ where: { id } });
  if (!drink) {
    return { error: 'ドリンクが見つかりません' };
  }

  await prisma.drink.update({
    where: { id },
    data: {
      category,
      name,
      imageUrl,
      customExamples,
    },
  });

  revalidatePath('/admin/dashboard');
  revalidatePath(`/menu/${category}`);
  revalidatePath(`/menu/${drink.category}`);
  return { success: true };
}

export async function deleteDrink(id: string) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return { error: '認証が必要です' };
  }

  const drink = await prisma.drink.findUnique({ where: { id } });
  if (!drink) {
    return { error: 'ドリンクが見つかりません' };
  }

  await prisma.drink.delete({
    where: { id },
  });

  revalidatePath('/admin/dashboard');
  revalidatePath(`/menu/${drink.category}`);
  return { success: true };
}
