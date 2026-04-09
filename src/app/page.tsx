'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/gameStore'
import { supabase } from '@/lib/supabase'

export default function SetupPage() {
  const router = useRouter()
  const { setTeams, setSessionId } = useGameStore()
  const [teamA, setTeamA] = useState('')
  const [teamB, setTeamB] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleStart() {
    if (!teamA.trim() || !teamB.trim()) {
      setError('Please enter a name for both teams.')
      return
    }
    setLoading(true)
    setError('')

    const { data, error: dbError } = await supabase
      .from('sessions')
      .insert({ team_a_name: teamA.trim(), team_b_name: teamB.trim() })
      .select()
      .single()

    if (dbError || !data) {
      setError('Could not start session. Check your Supabase connection.')
      setLoading(false)
      return
    }

    setTeams(teamA.trim(), teamB.trim())
    setSessionId(data.id)
    router.push('/game')
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Round<span className="text-orange-500">fire</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">Two teams. One device. No mercy.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">
              Team A
            </label>
            <input
              type="text"
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              placeholder="Enter team name"
              maxLength={20}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">
              Team B
            </label>
            <input
              type="text"
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              placeholder="Enter team name"
              maxLength={20}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition mt-2"
          >
            {loading ? 'Starting...' : 'Start Game →'}
          </button>
        </div>

      </div>
    </main>
  )
}