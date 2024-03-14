// pages/api/updateMetadata.js
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';
export default async function handler(req, res) {
  console.log('API Route hit with method:', req.method);
  if (req.method === 'POST') {
    const { userId, additionalInfo } = req.body;

    try {
      const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: additionalInfo,
      });

      // If no errors were thrown, the update was successful
      console.log('Updated user metadata:', updatedUser.publicMetadata);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Handle any requests that aren't POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
