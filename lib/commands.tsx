"use client"

import type React from "react"
import { projects } from "@/content/projects"
import { logs } from "@/content/logs"
import { writingPosts } from "@/content/writing"
import { AnimatedASCII, PulseBanner, MatrixRain, CompileAnimation, DeployAnimation, ReplayButton } from "./animations"

export interface CommandResult {
  content: React.ReactNode
  type?: "command" | "error" | "success"
  unlockMessage?: React.ReactNode
}

export interface DiscoveryState {
  basicCommandsUsed: number
  advancedCommandsUsed: number
  advancedUnlocked: boolean
  easterEggsFound: string[]
  showingHints: boolean
}

export interface Command {
  name: string
  description: string
  category: "Core" | "Utilities" | "Easter Eggs"
  tier: "basic" | "advanced" | "secret"
  execute: (args: string[], discoveryState?: DiscoveryState) => CommandResult
}

// Store aliases in localStorage
const getAliases = (): Record<string, string> => {
  if (typeof window === "undefined") return {}
  const saved = localStorage.getItem("terminal-aliases")
  return saved ? JSON.parse(saved) : {}
}

const setAlias = (alias: string, command: string) => {
  const aliases = getAliases()
  aliases[alias] = command
  localStorage.setItem("terminal-aliases", JSON.stringify(aliases))
}

// Basic Commands (Tier 1 - Always visible)
const basicCommands: Command[] = [
  {
    name: "help",
    description: "Show available commands",
    category: "Core",
    tier: "basic",
    execute: (args, discoveryState) => {
      const progress = discoveryState?.basicCommandsUsed || 0
      const advancedUnlocked = discoveryState?.advancedUnlocked || false
      const showingHints = discoveryState?.showingHints || false
      const easterEggsFound = discoveryState?.easterEggsFound?.length || 0

      return {
        content: (
          <div className="space-y-6">
            <div>
              <h3 className="text-accent font-semibold text-lg mb-3">Available Commands</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Commands are case-insensitive. Try typing a few letters and press Tab for autocomplete.
              </p>
            </div>

            {/* Basic Commands - Always Visible */}
            <div>
              <h4 className="text-foreground font-medium mb-2 flex items-center">
                <span className="text-terracotta mr-2">●</span>
                Basic Commands
                <span className="text-xs bg-terracotta/20 text-terracotta px-2 py-1 rounded ml-2">
                  {progress}/3 used
                </span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm pl-6">
                <div>
                  <span className="text-accent">about</span> - Learn about Dhruva
                </div>
                <div>
                  <span className="text-accent">work</span> - Current projects
                </div>
                <div>
                  <span className="text-accent">contact</span> - Get in touch
                </div>
                <div>
                  <span className="text-accent">now</span> - What I'm doing now
                </div>
                <div>
                  <span className="text-accent">writing</span> - Read blog posts
                </div>
              </div>
            </div>

            {/* Advanced Commands - Unlocked after 3 basic commands */}
            {advancedUnlocked ? (
              <div>
                <h4 className="text-foreground font-medium mb-2 flex items-center">
                  <span className="text-olive mr-2">◆</span>
                  Advanced Commands
                  <span className="text-xs bg-olive/20 text-olive px-2 py-1 rounded ml-2">
                    Unlocked! {discoveryState?.advancedCommandsUsed || 0} used
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm pl-6">
                  <div>
                    <span className="text-olive">stack</span> - My tech stack
                  </div>
                  <div>
                    <span className="text-olive">github</span> - GitHub activity
                  </div>
                  <div>
                    <span className="text-olive">research</span> - Research interests
                  </div>
                  <div>
                    <span className="text-olive">journey</span> - Personal story
                  </div>
                  <div>
                    <span className="text-olive">philosophy</span> - Core beliefs
                  </div>
                  <div>
                    <span className="text-olive">gigs</span> - Concert history
                  </div>
                  <div>
                    <span className="text-olive">vinyls</span> - Record collection
                  </div>
                  <div>
                    <span className="text-olive">spotify</span> - Current playlist
                  </div>
                  <div>
                    <span className="text-olive">random</span> - Random thoughts
                  </div>
                </div>
              </div>
            ) : (
              <div className="opacity-50">
                <h4 className="text-muted-foreground font-medium mb-2 flex items-center">
                  <span className="text-muted-foreground mr-2">◇</span>
                  Advanced Commands
                  <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded ml-2">
                    Locked - Try {3 - progress} more basic commands
                  </span>
                </h4>
                <p className="text-muted-foreground text-sm pl-6">
                  Use more basic commands to unlock deeper exploration...
                </p>
              </div>
            )}

            {/* Hints for Secret Commands */}
            {showingHints ? (
              <div>
                <h4 className="text-foreground font-medium mb-2 flex items-center">
                  <span className="text-teal-stone mr-2">✧</span>
                  Secret Commands
                  <span className="text-xs bg-teal-stone/20 text-teal-stone px-2 py-1 rounded ml-2">
                    {easterEggsFound}/5 found
                  </span>
                </h4>
                <div className="space-y-2 text-sm pl-6">
                  <div className="text-teal-stone italic">
                    "Brazilian art form meets flowing movement..."
                    <span className="text-muted-foreground/60 ml-2">Try: jits</span>
                  </div>
                  <div className="text-teal-stone italic">
                    "Vinyl spins with warm, imperfect beauty..."
                    <span className="text-muted-foreground/60 ml-2">Try: analog</span>
                  </div>
                  <div className="text-teal-stone italic">
                    "Green rain falls in digital patterns..."
                    <span className="text-muted-foreground/60 ml-2">Try: matrix</span>
                  </div>
                  <div className="text-teal-stone italic">
                    "Sacred geometry blooms from intention..."
                    <span className="text-muted-foreground/60 ml-2">Try: rangoli</span>
                  </div>
                  <div className="text-teal-stone italic">
                    "Press to begin infinite game..."
                    <span className="text-muted-foreground/60 ml-2">Try: play</span>
                  </div>
                </div>
              </div>
            ) : advancedUnlocked ? (
              <div className="opacity-50">
                <h4 className="text-muted-foreground font-medium mb-2 flex items-center">
                  <span className="text-muted-foreground mr-2">✦</span>
                  Secret Commands
                  <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded ml-2">
                    Hidden - Explore more advanced commands
                  </span>
                </h4>
                <p className="text-muted-foreground text-sm pl-6">
                  There are hidden treasures waiting to be discovered...
                </p>
              </div>
            ) : null}

            <div className="border-t border-border/20 pt-4">
              <h4 className="text-foreground font-medium mb-2">Examples:</h4>
              <div className="space-y-1 text-sm pl-4">
                <div>
                  <span className="text-muted-foreground">❯</span> <span className="text-accent">about</span>{" "}
                  <span className="text-muted-foreground/60">- Start exploring</span>
                </div>
                {advancedUnlocked && (
                  <div>
                    <span className="text-muted-foreground">❯</span> <span className="text-olive">stack</span>{" "}
                    <span className="text-muted-foreground/60">- See my technologies</span>
                  </div>
                )}
                {showingHints && (
                  <div>
                    <span className="text-muted-foreground">❯</span> <span className="text-teal-stone">jits</span>{" "}
                    <span className="text-muted-foreground/60">- Discover hidden art</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-muted-foreground/70 text-sm border-t border-border/20 pt-4">
              💡 <strong>Discovery:</strong> Each layer unlocks as you explore deeper. Start with basic commands to
              reveal more.
            </p>
          </div>
        ),
      }
    },
  },
  {
    name: "about",
    description: "Learn about Dhruva",
    category: "Core",
    tier: "basic",
    execute: () => ({
      content: (
        <div className="space-y-3">
          <p>I'm Dhruva — Creative Technologist & Product Builder.</p>
          <p className="text-accent font-medium">I build product for people I care about.</p>
          <p>
            I work at the intersection of technology, culture, and sport—designing systems where communities thrive.
          </p>
          <div className="mt-4 space-x-4 text-sm">
            <span className="text-muted-foreground">→</span>
            <a
              href="#"
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "projects" }))}
              className="text-accent hover:underline"
            >
              projects
            </a>
            <a
              href="#"
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "writing" }))}
              className="text-accent hover:underline"
            >
              writing
            </a>
            <a
              href="#"
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "contact" }))}
              className="text-accent hover:underline"
            >
              contact
            </a>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "now",
    description: "What Dhruva is working on now",
    category: "Core",
    tier: "basic",
    execute: () => ({
      content: (
        <div className="space-y-2">
          <p>
            Now: Building Graicie (AI Jiu-Jitsu), refining CultureCo (creator commerce), and shipping a terminal website
            refresh. Training no‑gi, writing short meditations, and experimenting with fractal rangoli.
          </p>
          <p className="text-muted-foreground text-sm">Updated: {new Date().toLocaleDateString()}</p>
        </div>
      ),
    }),
  },
  {
    name: "work",
    description: "Current projects and portfolio",
    category: "Core",
    tier: "basic",
    execute: () => ({
      content: (
        <div className="space-y-6">
          {["AI", "Web3", "Culture", "Sport"].map((cluster) => {
            const clusterProjects = projects.filter((p) => p.cluster === cluster)
            if (clusterProjects.length === 0) return null

            return (
              <div key={cluster}>
                <h4 className="text-accent font-medium mb-3">{cluster}</h4>
                <div className="space-y-2">
                  {clusterProjects.map((project) => (
                    <div key={project.slug} className="text-sm">
                      <span className="text-foreground font-medium">{project.title}</span>
                      <span className="text-muted-foreground mx-2">•</span>
                      <span className="text-muted-foreground">{project.year}</span>
                      <span className="text-muted-foreground mx-2">•</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          project.status === "Active" ? "bg-accent/20 text-accent" : "bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        {project.status}
                      </span>
                      <p className="text-muted-foreground/80 mt-1">{project.summary}</p>
                      {project.links.length > 0 && (
                        <div className="mt-1 space-x-2">
                          {project.links.map((link) => (
                            <a key={link.label} href={link.href} className="text-accent text-xs hover:underline">
                              [{link.label}]
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ),
    }),
  },
  {
    name: "writing",
    description: "Read blog posts and essays",
    category: "Core",
    tier: "basic",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-accent font-semibold">Writing</h3>
          <div className="space-y-3">
            {writingPosts.map((post) => (
              <div key={post.slug} className="border-l-2 border-border/30 pl-4">
                <h4 className="text-foreground font-medium">{post.title}</h4>
                <p className="text-muted-foreground/80 text-sm mt-1">{post.excerpt}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("terminal-command", { detail: `open ${post.slug}` }))
                    }
                    className="text-accent hover:underline"
                  >
                    read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    }),
  },
  {
    name: "whativedone",
    description: "Weekly changelog and updates",
    category: "Core",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-accent font-semibold">What I've Done</h3>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.date} className="border-l-2 border-border/30 pl-4">
                <h4 className="text-accent font-medium">{log.date}</h4>
                <ul className="mt-2 space-y-1">
                  {log.bullets.map((bullet, index) => (
                    <li key={index} className="text-sm text-muted-foreground/80">
                      <span className="text-muted-foreground mr-2">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                {log.links && log.links.length > 0 && (
                  <div className="mt-2 space-x-2">
                    {log.links.map((link) => (
                      <a key={link.label} href={link.href} className="text-accent text-xs hover:underline">
                        [{link.label}]
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    }),
  },
  {
    name: "resume",
    description: "View resume and CV",
    category: "Core",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p>
              <span className="text-muted-foreground">Role:</span> Creative Technologist & Product Builder
            </p>
            <p>
              <span className="text-muted-foreground">Focus:</span> AI, Web3, community systems
            </p>
            <p>
              <span className="text-muted-foreground">Global:</span> India ↔ US
            </p>
          </div>
          <div className="space-x-4">
            <a href="#" className="text-accent hover:underline">
              Download PDF
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "open resume" }))}
              className="text-muted-foreground hover:underline"
            >
              open resume
            </button>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "contact",
    description: "Get in touch with Dhruva",
    category: "Core",
    tier: "basic",
    execute: () => ({
      content: (
        <div className="space-y-3">
          <p>
            <span className="text-muted-foreground">Email:</span>{" "}
            <a href="mailto:hi@dhruva.life" className="text-accent hover:underline">
              hi@dhruva.life
            </a>
          </p>
          <p>
            <span className="text-muted-foreground">Socials:</span>{" "}
            <a href="https://x.com/arenatwox" className="text-accent hover:underline">
              X/Twitter
            </a>
            ,{" "}
            <a href="https://linkedin.com/in/dhruva" className="text-accent hover:underline">
              LinkedIn
            </a>
            ,{" "}
            <a href="https://instagram.com/dhruva" className="text-accent hover:underline">
              Instagram
            </a>
          </p>
          <p>
            <span className="text-muted-foreground">Book a chat:</span>{" "}
            <a href="#" className="text-accent hover:underline">
              link placeholder
            </a>
          </p>
          <p>
            <span className="text-muted-foreground">Open ports:</span> 25 (SMTP), 443 (TLS), 8000 (dev)
          </p>
        </div>
      ),
    }),
  },
]

// Advanced Commands (Tier 2 - Unlocked after 3 basic commands)
const advancedCommands: Command[] = [
  {
    name: "stack",
    description: "My technology stack",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">Tech Stack</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-foreground font-medium">Languages</h4>
              <p className="text-muted-foreground/80">TypeScript, Python, Solidity, Go</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium">Frameworks</h4>
              <p className="text-muted-foreground/80">Next.js, React, FastAPI, Hardhat</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium">AI/ML</h4>
              <p className="text-muted-foreground/80">OpenAI, Anthropic, Hugging Face, LangChain</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium">Infrastructure</h4>
              <p className="text-muted-foreground/80">Vercel, AWS, Supabase, Ethereum</p>
            </div>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "github",
    description: "GitHub activity and contributions",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">GitHub Activity</h3>
          <div className="space-y-2">
            <p>
              <span className="text-muted-foreground">Username:</span> @dhruva-chakravarthi
            </p>
            <p>
              <span className="text-muted-foreground">Repositories:</span> 50+ public
            </p>
            <p>
              <span className="text-muted-foreground">Languages:</span> TypeScript, Python, Solidity
            </p>
            <p>
              <span className="text-muted-foreground">Recent:</span> Graicie AI, CultureCo, ArenaTwo
            </p>
          </div>
          <a href="https://github.com/dhruva-chakravarthi" className="text-olive hover:underline">
            View Profile →
          </a>
        </div>
      ),
    }),
  },
  {
    name: "research",
    description: "Research interests and explorations",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">Research Interests</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-foreground font-medium">AI Systems</h4>
              <p className="text-muted-foreground/80">
                Multimodal models for sports analysis, embodied AI for movement
              </p>
            </div>
            <div>
              <h4 className="text-foreground font-medium">Community Dynamics</h4>
              <p className="text-muted-foreground/80">Positive-sum game design, creator economy infrastructure</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium">Cultural Bridges</h4>
              <p className="text-muted-foreground/80">Technology as cultural preservation, diaspora identity</p>
            </div>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "journey",
    description: "Personal and professional story",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">Journey</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-foreground font-medium">Origins</h4>
              <p className="text-muted-foreground/80">Growing up between Indian traditions and global technology</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium">Discovery</h4>
              <p className="text-muted-foreground/80">Found jiu-jitsu, learned about flow states and resilience</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium">Evolution</h4>
              <p className="text-muted-foreground/80">Building systems that honor culture while embracing innovation</p>
            </div>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "philosophy",
    description: "Core beliefs and principles",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">Philosophy</h3>
          <div className="space-y-3">
            <div>
              <p className="text-accent font-medium">"Build positive-sum systems where communities thrive"</p>
              <p className="text-muted-foreground/80">
                Technology should amplify collective intelligence, not extract from it
              </p>
            </div>
            <div>
              <p className="text-accent font-medium">"Flow states are everywhere"</p>
              <p className="text-muted-foreground/80">
                From code to combat, creativity emerges when we find the rhythm
              </p>
            </div>
            <div>
              <p className="text-accent font-medium">"Culture is the compass"</p>
              <p className="text-muted-foreground/80">Innovation without cultural context is just clever distraction</p>
            </div>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "gigs",
    description: "Concert and live music history",
    category: "Core",
    tier: "advanced",
    execute: () => {
      // Fetch gig data from Vercel blob
      const fetchGigs = async () => {
        try {
          const response = await fetch(
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Gig%20List-zVc8TZ9eLBWTtxidiKN2zrBO2uBabd.csv",
          )
          const csvText = await response.text()

          // Parse CSV (simple parser for this use case)
          const lines = csvText.split("\n").slice(1) // Skip header
          const gigs = lines
            .filter((line) => line.trim())
            .map((line) => {
              const [artist, venue, date, city] = line.split(",").map((item) => item.trim().replace(/"/g, ""))
              return { artist, venue, date, city }
            })
            .slice(0, 10) // Show latest 10

          return (
            <div className="space-y-4">
              <h3 className="text-olive font-semibold">Live Music</h3>
              <div className="space-y-2">
                {gigs.map((gig, index) => (
                  <div key={index}>
                    <span className="text-foreground font-medium">{gig.artist}</span>
                    <span className="text-muted-foreground mx-2">•</span>
                    <span className="text-muted-foreground">
                      {gig.venue} {gig.date}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground/70 text-sm">
                Live music is temporary community - shared rhythm, shared moment
              </p>
            </div>
          )
        } catch (error) {
          return (
            <div className="space-y-4">
              <h3 className="text-olive font-semibold">Live Music</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-foreground font-medium">Radiohead</span>
                  <span className="text-muted-foreground mx-2">•</span>
                  <span className="text-muted-foreground">Madison Square Garden 2018</span>
                </div>
                <div>
                  <span className="text-foreground font-medium">Bonobo</span>
                  <span className="text-muted-foreground mx-2">•</span>
                  <span className="text-muted-foreground">Brooklyn Steel 2019</span>
                </div>
                <div>
                  <span className="text-foreground font-medium">Kiasmos</span>
                  <span className="text-muted-foreground mx-2">•</span>
                  <span className="text-muted-foreground">Elsewhere 2020</span>
                </div>
              </div>
              <p className="text-muted-foreground/70 text-sm">
                Live music is temporary community - shared rhythm, shared moment
              </p>
            </div>
          )
        }
      }

      // For now, return static content since we can't use async in this context
      // TODO: Implement proper async data fetching in the terminal component
      return {
        content: (
          <div className="space-y-4">
            <h3 className="text-olive font-semibold">Live Music</h3>
            <div className="space-y-2">
              <div>
                <span className="text-foreground font-medium">Radiohead</span>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground">Madison Square Garden 2018</span>
              </div>
              <div>
                <span className="text-foreground font-medium">Bonobo</span>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground">Brooklyn Steel 2019</span>
              </div>
              <div>
                <span className="text-foreground font-medium">Kiasmos</span>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground">Elsewhere 2020</span>
              </div>
            </div>
            <p className="text-muted-foreground/70 text-sm">
              Live music is temporary community - shared rhythm, shared moment
            </p>
            <p className="text-muted-foreground/60 text-xs">(Loading from gig database...)</p>
          </div>
        ),
      }
    },
  },
  {
    name: "vinyls",
    description: "Record collection highlights",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">Vinyl Collection</h3>
          <div className="space-y-2">
            <div>
              <span className="text-foreground font-medium">Miles Davis</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Kind of Blue (Blue Note reissue)</span>
            </div>
            <div>
              <span className="text-foreground font-medium">Kiasmos</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Blurred EP (Limited white)</span>
            </div>
            <div>
              <span className="text-foreground font-medium">Bonobo</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Migration (Deluxe edition)</span>
            </div>
          </div>
          <p className="text-muted-foreground/70 text-sm">Analog warmth {">"} digital precision</p>
        </div>
      ),
    }),
  },
  {
    name: "spotify",
    description: "Current playlist and listening habits",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">Currently Playing</h3>
          <div className="space-y-2">
            <div>
              <span className="text-foreground font-medium">Deep Focus</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Ambient techno for coding sessions</span>
            </div>
            <div>
              <span className="text-foreground font-medium">Flow States</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Minimalist beats for training</span>
            </div>
            <div>
              <span className="text-foreground font-medium">Sunday Mornings</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Jazz & reflection</span>
            </div>
          </div>
          <a href="#" className="text-olive hover:underline">
            Follow on Spotify →
          </a>
        </div>
      ),
    }),
  },
  {
    name: "random",
    description: "Random thoughts and observations",
    category: "Core",
    tier: "advanced",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-olive font-semibold">Random Thoughts</h3>
          <div className="space-y-3">
            {[
              "The best technical solutions feel inevitable in hindsight",
              "Jiu-jitsu is chess with your body as the pieces",
              "Community forms around shared struggle, not shared comfort",
              "Vinyl records are meditation objects for the digital age",
              "Code is culture made executable",
            ].map((thought, index) => (
              <div key={index} className="border-l-2 border-olive/30 pl-4">
                <p className="text-muted-foreground/80 italic">"{thought}"</p>
              </div>
            ))}
          </div>
        </div>
      ),
    }),
  },
]

// Utility Commands
const utilityCommands: Command[] = [
  {
    name: "search",
    description: "Search across all content",
    category: "Utilities",
    tier: "basic",
    execute: (args) => {
      const term = args.join(" ").toLowerCase()
      if (!term) {
        return { content: "Usage: search <term>", type: "error" }
      }

      const results: Array<{ type: string; title: string; content: string; slug?: string }> = []

      // Search projects
      projects.forEach((project) => {
        if (project.title.toLowerCase().includes(term) || project.summary.toLowerCase().includes(term)) {
          results.push({
            type: "Project",
            title: project.title,
            content: project.summary,
            slug: project.slug,
          })
        }
      })

      // Search writing
      writingPosts.forEach((post) => {
        if (post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term)) {
          results.push({
            type: "Writing",
            title: post.title,
            content: post.excerpt,
            slug: post.slug,
          })
        }
      })

      // Search logs
      logs.forEach((log) => {
        log.bullets.forEach((bullet) => {
          if (bullet.toLowerCase().includes(term)) {
            results.push({
              type: "Log",
              title: log.date,
              content: bullet,
            })
          }
        })
      })

      if (results.length === 0) {
        return { content: `No results found for "${term}"`, type: "error" }
      }

      return {
        content: (
          <div className="space-y-3">
            <p className="text-accent">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for "{term}":
            </p>
            {results.map((result, index) => (
              <div key={index} className="border-l-2 border-border/30 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded">{result.type}</span>
                  <span className="text-foreground font-medium">{result.title}</span>
                </div>
                <p className="text-muted-foreground/80 text-sm mt-1">{result.content}</p>
                {result.slug && (
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("terminal-command", { detail: `open ${result.slug}` }))
                    }
                    className="text-accent text-xs hover:underline mt-1"
                  >
                    open
                  </button>
                )}
              </div>
            ))}
          </div>
        ),
      }
    },
  },
  {
    name: "open",
    description: "Open detailed view of content",
    category: "Utilities",
    tier: "basic",
    execute: (args) => {
      const slug = args[0]
      if (!slug) {
        return { content: "Usage: open <slug>", type: "error" }
      }

      // Check projects
      const project = projects.find((p) => p.slug === slug)
      if (project) {
        return {
          content: (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-accent font-semibold text-lg">{project.title}</h3>
                <span className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded">{project.cluster}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.status === "Active"
                      ? "bg-accent/20 text-accent"
                      : project.status === "Concept"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted/20 text-muted-foreground"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-muted-foreground">{project.year}</p>
              <p>{project.summary}</p>
              {project.links.length > 0 && (
                <div className="space-x-3">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.href} className="text-accent hover:underline">
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          ),
        }
      }

      // Check writing
      const post = writingPosts.find((p) => p.slug === slug)
      if (post) {
        return {
          content: (
            <div className="space-y-4">
              <h3 className="text-accent font-semibold text-lg">{post.title}</h3>
              <p className="text-muted-foreground text-sm">{post.date}</p>
              <div className="prose prose-invert max-w-none">
                <p>{post.content}</p>
              </div>
            </div>
          ),
        }
      }

      // Special case for resume
      if (slug === "resume") {
        return {
          content: (
            <div className="space-y-4">
              <h3 className="text-accent font-semibold text-lg">Dhruva Chakravarthi</h3>
              <p className="text-muted-foreground">Creative Technologist & Product Builder</p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-foreground font-medium">Focus Areas</h4>
                  <p className="text-muted-foreground/80">
                    AI systems, Web3 infrastructure, community platforms, sports technology
                  </p>
                </div>

                <div>
                  <h4 className="text-foreground font-medium">Current Projects</h4>
                  <ul className="text-muted-foreground/80 space-y-1">
                    <li>• Graicie - AI training assistant for Jiu-Jitsu</li>
                    <li>• CultureCo - Creator commerce for Indian artists</li>
                    <li>• ArenaTwo - Fan-driven football league concept</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-foreground font-medium">Philosophy</h4>
                  <p className="text-muted-foreground/80">
                    Building positive-sum systems where communities thrive. Technology as a bridge between culture,
                    sport, and human connection.
                  </p>
                </div>
              </div>
            </div>
          ),
        }
      }

      return { content: `Content not found: ${slug}`, type: "error" }
    },
  },
  {
    name: "ls",
    description: "List directories",
    category: "Utilities",
    tier: "basic",
    execute: () => ({
      content: (
        <div className="space-y-2">
          <p className="text-muted-foreground">Directories:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-accent">/about</div>
            <div className="text-accent">/projects</div>
            <div className="text-accent">/writing</div>
            <div className="text-accent">/logs</div>
            <div className="text-accent">/resume</div>
            <div className="text-accent">/contact</div>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "cat",
    description: "Print raw content",
    category: "Utilities",
    tier: "basic",
    execute: (args) => {
      const slug = args[0]
      if (!slug) {
        return { content: "Usage: cat <slug>", type: "error" }
      }

      const post = writingPosts.find((p) => p.slug === slug)
      if (post) {
        return {
          content: (
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground/80">
              {`---
title: ${post.title}
date: ${post.date}
excerpt: ${post.excerpt}
---

${post.content}`}
            </pre>
          ),
        }
      }

      return { content: `File not found: ${slug}`, type: "error" }
    },
  },
  {
    name: "clear",
    description: "Clear terminal output",
    category: "Utilities",
    tier: "basic",
    execute: () => {
      // This will be handled by the terminal component
      window.dispatchEvent(new CustomEvent("terminal-clear"))
      return { content: "", type: "success" }
    },
  },
  {
    name: "history",
    description: "Show command history",
    category: "Utilities",
    tier: "basic",
    execute: () => {
      const history = JSON.parse(localStorage.getItem("terminal-history") || "[]")
      if (history.length === 0) {
        return { content: "No command history", type: "error" }
      }

      return {
        content: (
          <div className="space-y-1">
            <p className="text-muted-foreground">Last {Math.min(10, history.length)} commands:</p>
            {history.slice(-10).map((cmd: string, index: number) => (
              <div key={index} className="text-sm">
                <span className="text-muted-foreground/60 mr-2">{history.length - 10 + index + 1}</span>
                <span className="text-foreground">{cmd}</span>
              </div>
            ))}
          </div>
        ),
      }
    },
  },
  {
    name: "alias",
    description: "Create command aliases",
    category: "Utilities",
    tier: "basic",
    execute: (args) => {
      const aliasString = args.join(" ")
      const match = aliasString.match(/^(\w+)=(.+)$/)

      if (!match) {
        const aliases = getAliases()
        if (Object.keys(aliases).length === 0) {
          return { content: "No aliases set. Usage: alias <name>=<command>", type: "error" }
        }

        return {
          content: (
            <div className="space-y-1">
              <p className="text-muted-foreground">Current aliases:</p>
              {Object.entries(aliases).map(([alias, command]) => (
                <div key={alias} className="text-sm">
                  <span className="text-accent">{alias}</span>
                  <span className="text-muted-foreground mx-2">=</span>
                  <span className="text-foreground">{command}</span>
                </div>
              ))}
            </div>
          ),
        }
      }

      const [, alias, command] = match
      setAlias(alias, command)

      return {
        content: `Alias set: ${alias} = ${command}`,
        type: "success",
      }
    },
  },
  {
    name: "theme",
    description: "Change color theme",
    category: "Utilities",
    tier: "basic",
    execute: (args) => {
      const theme = args[0]
      if (!theme || !["dark", "light", "auto"].includes(theme)) {
        return { content: "Usage: theme <dark|light|auto>", type: "error" }
      }

      // This would be handled by the theme hook
      localStorage.setItem("terminal-theme", theme)

      return {
        content: `Theme set to ${theme}`,
        type: "success",
      }
    },
  },
  {
    name: "subscribe",
    description: "Subscribe to updates",
    category: "Utilities",
    tier: "basic",
    execute: () => ({
      content: (
        <div className="space-y-3">
          <p className="text-accent">Subscribe for updates</p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-muted/10 border border-border/30 rounded px-3 py-2 text-foreground placeholder-sage/50 flex-1"
            />
            <button className="bg-terracotta hover:bg-terracotta/80 text-foreground px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
          <p className="text-muted-foreground/60 text-sm">Get notified about new projects and writing.</p>
        </div>
      ),
    }),
  },
  {
    name: "share",
    description: "Share current terminal state",
    category: "Utilities",
    tier: "basic",
    execute: () => {
      const url = `${window.location.origin}${window.location.pathname}#shared`
      navigator.clipboard.writeText(url)

      return {
        content: "Permalink copied to clipboard!",
        type: "success",
      }
    },
  },
]

// Easter Eggs with frame-based animations
const asciiEasterEggs: Command[] = [
  {
    name: "turntable",
    description: "Spinning record animation",
    category: "Easter Eggs",
    execute: () => {
      const frames = [
        "    ╭─────────╮\n    │  ●───○  │\n    │    ●    │\n    │  ○───●  │\n    ╰─────────╯",
        "    ╭─────────╮\n    │  ○───●  │\n    │    ○    │\n    │  ●───○  │\n    ╰─────────╯",
        "    ╭─────────╮\n    │  ●───○  │\n    │    ●    │\n    │  ○───●  │\n    ╰─────────╯",
        "    ╭─────────╮\n    │  ○───●  │\n    │    ○    │\n    │  ●───○  │\n    ╰─────────╯",
      ]

      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <AnimatedASCII frames={frames} duration={2000} />
            </div>
            <p className="text-center text-muted-foreground">🎵 Now spinning... 🎵</p>
            <ReplayButton command="turntable" />
          </div>
        ),
      }
    },
  },
  {
    name: "slapbump",
    description: "Jiu-jitsu greeting animation",
    category: "Easter Eggs",
    execute: () => {
      const frames = ["  o/     \\o  ", "  o|     |o  ", "  o\\     /o  ", "  o/\\   /\\o  ", "  o/\\o o/\\o  "]

      const tips = [
        "Keep your grips tight and your base strong.",
        "Flow like water, strike like lightning.",
        "The mat doesn't lie - train hard, stay humble.",
        "Every tap is a lesson, every roll is growth.",
        "Respect the tap, reset, and go again.",
      ]

      const randomTip = tips[Math.floor(Math.random() * tips.length)]

      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <AnimatedASCII frames={frames} duration={2500} />
            </div>
            <p className="text-center text-accent font-medium">🥋 Slap and bump! 🥋</p>
            <p className="text-center text-muted-foreground italic">"{randomTip}"</p>
            <ReplayButton command="slapbump" />
          </div>
        ),
      }
    },
  },
  {
    name: "rangoli",
    description: "Fractal rangoli bloom animation",
    category: "Easter Eggs",
    execute: () => {
      const frames = ["    ·    ", "   ·•·   ", "  ·•○•·  ", " ·•○●○•· ", "·•○●◆●○•·", "•○●◆◇◆●○•"]

      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <AnimatedASCII frames={frames} duration={3000} />
            </div>
            <p className="text-center text-accent">✨ Rangoli blooms with intention ✨</p>
            <ReplayButton command="rangoli" />
          </div>
        ),
      }
    },
  },
  {
    name: "linkinpark",
    description: "Figlet banner pulse animation",
    category: "Easter Eggs",
    execute: () => {
      const banner = `
██╗     ██╗███╗   ██╗██╗  ██╗██╗███╗   ██╗    ██████╗  █████╗ ██████╗ ██╗  ██╗
██║     ██║████╗  ██║██║ ██╔╝██║████╗  ██║    ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝
██║     ██║██╔██╗ ██║█████╔╝ ██║██╔██╗ ██║    ██████╔╝███████║██████╔╝█████╔╝ 
██║     ██║██║╚██╗██║██╔═██╗ ██║██║╚██╗██║    ██╔═══╝ ██╔══██║██╔══██╗██╔═██╗ 
███████╗██║██║ ╚████║██║  ██╗██║██║ ╚████║    ██║     ██║  ██║██║  ██║██║  ██╗
╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
      `

      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-xs">
              <PulseBanner text={banner} />
            </div>
            <p className="text-center text-muted-foreground">🎤 In the end, it doesn't even matter... 🎤</p>
            <ReplayButton command="linkinpark" />
          </div>
        ),
      }
    },
  },
  {
    name: "matrix",
    description: "Digital rain animation",
    category: "Easter Eggs",
    execute: () => {
      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-sm">
              <MatrixRain />
            </div>
            <p className="text-center text-accent">There is no spoon... 🥄</p>
            <ReplayButton command="matrix" />
          </div>
        ),
      }
    },
  },
  {
    name: "compile",
    description: "ASCII progress bar with logs",
    category: "Easter Eggs",
    execute: () => {
      return {
        content: (
          <div className="space-y-2">
            <CompileAnimation />
            <ReplayButton command="compile" />
          </div>
        ),
      }
    },
  },
  {
    name: "deploy",
    description: "Deployment progress animation",
    category: "Easter Eggs",
    execute: () => {
      return {
        content: (
          <div className="space-y-2">
            <DeployAnimation />
            <ReplayButton command="deploy" />
          </div>
        ),
      }
    },
  },
  {
    name: "tapout",
    description: "Triangle submission animation",
    category: "Easter Eggs",
    execute: () => {
      const frames = ["    /\\    ", "   /  \\   ", "  /____\\  ", "  \\____/  ", "   \\  /   ", "    \\/    "]

      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <AnimatedASCII frames={frames} duration={2000} />
            </div>
            <p className="text-center text-accent font-medium">Respect the tap. Reset. Go again.</p>
            <ReplayButton command="tapout" />
          </div>
        ),
      }
    },
  },
  {
    name: "oss",
    description: "OSS figlet banner",
    category: "Easter Eggs",
    execute: () => {
      const banner = `
 ██████╗ ███████╗███████╗
██╔═══██╗██╔════╝██╔════╝
██║   ██║███████╗███████╗
██║   ██║╚════██║╚════██║
╚██████╔╝███████║███████║
 ╚═════╝ ╚══════╝╚══════╝
      `

      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-sm text-center">
              <pre className="text-accent">{banner}</pre>
            </div>
            <p className="text-center text-muted-foreground">🥋 Onegaishimasu! 🥋</p>
            <ReplayButton command="oss" />
          </div>
        ),
      }
    },
  },
  {
    name: "vinyl",
    description: "Record crate animation",
    category: "Easter Eggs",
    execute: () => {
      const crate = `
╭─────────────────╮
│ ████ ████ ████ │
│ ████ ████ ████ │
│ ████ ████ ████ │
╰─────────────────╯
      `

      const albums = [
        "Miles Davis - Kind of Blue",
        "John Coltrane - A Love Supreme",
        "Thelonious Monk - Brilliant Corners",
        "Bill Evans - Waltz for Debby",
        "Art Blakey - Moanin'",
      ]

      const randomAlbum = albums[Math.floor(Math.random() * albums.length)]

      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <pre className="text-accent">{crate}</pre>
            </div>
            <p className="text-center text-accent">🎵 Pulled from the crate: {randomAlbum} 🎵</p>
            <ReplayButton command="vinyl" />
          </div>
        ),
      }
    },
  },
]

// Secret Commands (Tier 3 - Easter eggs with animations)
const secretCommands: Command[] = [
  {
    name: "jits",
    description: "Brazilian jiu-jitsu flow animation",
    category: "Easter Eggs",
    tier: "secret",
    execute: () => {
      const frames = ["  o/     \\o  ", "  o|     |o  ", "  o\\     /o  ", "  o/\\   /\\o  ", "  o/\\o o/\\o  "]
      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <AnimatedASCII frames={frames} duration={2500} />
            </div>
            <p className="text-center text-teal-stone font-medium">🥋 Flow like water, adapt like bamboo 🥋</p>
            <ReplayButton command="jits" />
          </div>
        ),
        unlockMessage: (
          <div className="text-teal-stone text-sm font-medium">✧ Easter Egg Unlocked: Brazilian Flow ✧</div>
        ),
      }
    },
  },
  {
    name: "analog",
    description: "Vinyl record spinning animation",
    category: "Easter Eggs",
    tier: "secret",
    execute: () => {
      const frames = [
        "    ╭─────────╮\n    │  ●───○  │\n    │    ●    │\n    │  ○───●  │\n    ╰─────────╯",
        "    ╭─────────╮\n    │  ○───●  │\n    │    ○    │\n    │  ●───○  │\n    ╰─────────╯",
        "    ╭─────────╮\n    │  ●───○  │\n    │    ●    │\n    │  ○───●  │\n    ╰─────────╯",
        "    ╭─────────╮\n    │  ○───●  │\n    │    ○    │\n    │  ●───○  │\n    ╰─────────╯",
      ]
      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <AnimatedASCII frames={frames} duration={2000} />
            </div>
            <p className="text-center text-teal-stone">🎵 Analog warmth in a digital world 🎵</p>
            <ReplayButton command="analog" />
          </div>
        ),
        unlockMessage: <div className="text-teal-stone text-sm font-medium">✧ Easter Egg Unlocked: Vinyl Spin ✧</div>,
      }
    },
  },
  {
    name: "matrix",
    description: "Digital rain animation",
    category: "Easter Eggs",
    tier: "secret",
    execute: () => {
      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-sm">
              <MatrixRain />
            </div>
            <p className="text-center text-teal-stone">There is no spoon... 🥄</p>
            <ReplayButton command="matrix" />
          </div>
        ),
        unlockMessage: <div className="text-teal-stone text-sm font-medium">✧ Easter Egg Unlocked: Digital Rain ✧</div>,
      }
    },
  },
  {
    name: "rangoli",
    description: "Sacred geometry bloom animation",
    category: "Easter Eggs",
    tier: "secret",
    execute: () => {
      const frames = ["    ·    ", "   ·•·   ", "  ·•○•·  ", " ·•○●○•· ", "·•○●◆●○•·", "•○●◆◇◆●○•"]
      return {
        content: (
          <div className="space-y-4">
            <div className="font-mono text-center">
              <AnimatedASCII frames={frames} duration={3000} />
            </div>
            <p className="text-center text-teal-stone">✨ Sacred patterns emerge from intention ✨</p>
            <ReplayButton command="rangoli" />
          </div>
        ),
        unlockMessage: (
          <div className="text-teal-stone text-sm font-medium">✧ Easter Egg Unlocked: Sacred Geometry ✧</div>
        ),
      }
    },
  },
  {
    name: "play",
    description: "Infinite game meditation",
    category: "Easter Eggs",
    tier: "secret",
    execute: () => {
      const symbols = ["○", "◯", "⊙", "●", "⚫", "⬤", "🎯"]
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
      return {
        content: (
          <div className="space-y-4 text-center">
            <div className="text-6xl text-teal-stone animate-pulse">{randomSymbol}</div>
            <div className="space-y-2">
              <p className="text-teal-stone font-medium">The point of an infinite game is to keep playing</p>
              <p className="text-muted-foreground/70 text-sm italic">Press play again. Each moment, different.</p>
            </div>
            <ReplayButton command="play" />
          </div>
        ),
        unlockMessage: (
          <div className="text-teal-stone text-sm font-medium">✧ Easter Egg Unlocked: Infinite Game ✧</div>
        ),
      }
    },
  },
]

// Combine all commands
const allCommands = [...basicCommands, ...advancedCommands, ...utilityCommands, ...secretCommands, ...asciiEasterEggs]

// Command execution function
export function setExecuteCommand(fn: (command: string) => void) {
  window.addEventListener("terminal-command", (event: CustomEvent) => {
    fn(event.detail)
  })
}

export function executeCommand(input: string, discoveryState?: DiscoveryState): CommandResult {
  const [commandName, ...args] = input.trim().split(" ")
  const lowerCommandName = commandName.toLowerCase()

  // Check aliases first (also case-insensitive)
  const aliases = getAliases()
  const resolvedCommand = Object.keys(aliases).find((alias) => alias.toLowerCase() === lowerCommandName)
    ? aliases[Object.keys(aliases).find((alias) => alias.toLowerCase() === lowerCommandName)!]
    : lowerCommandName

  const command = allCommands.find((cmd) => cmd.name.toLowerCase() === resolvedCommand.toLowerCase())

  if (!command) {
    return {
      content: `Command not found: ${commandName}. Type 'help' for available commands.`,
      type: "error",
    }
  }

  // Check if command is accessible based on discovery state
  const advancedUnlocked = discoveryState?.advancedUnlocked || false
  const showingHints = discoveryState?.showingHints || false

  if (command.tier === "advanced" && !advancedUnlocked) {
    return {
      content: (
        <div className="space-y-2">
          <p className="text-muted-foreground">🔒 Advanced command locked</p>
          <p className="text-muted-foreground/70 text-sm">
            Try {3 - (discoveryState?.basicCommandsUsed || 0)} more basic commands to unlock advanced features.
          </p>
          <p className="text-ochre text-sm italic">Hint: about, work, contact, now, writing</p>
        </div>
      ),
      type: "error",
    }
  }

  if (command.tier === "secret" && !showingHints) {
    return {
      content: (
        <div className="space-y-2">
          <p className="text-muted-foreground">✧ Command exists but remains hidden ✧</p>
          <p className="text-muted-foreground/70 text-sm">
            Secret commands reveal themselves to those who explore deeper...
          </p>
        </div>
      ),
      type: "error",
    }
  }

  try {
    const result = command.execute(args, discoveryState)

    // Add unlock notification for easter eggs
    if (command.tier === "secret" && result.unlockMessage) {
      return {
        ...result,
        content: (
          <div className="space-y-4">
            {result.unlockMessage}
            {result.content}
          </div>
        ),
      }
    }

    return result
  } catch (error) {
    return {
      content: `Error executing command: ${error}`,
      type: "error",
    }
  }
}

export function getAllCommands(): Command[] {
  return allCommands
}

export function getCommandSuggestions(input: string, discoveryState?: DiscoveryState): string[] {
  const query = input.toLowerCase()
  const advancedUnlocked = discoveryState?.advancedUnlocked || false
  const showingHints = discoveryState?.showingHints || false

  return allCommands
    .filter((cmd) => {
      // Always show basic commands and utilities
      if (cmd.tier === "basic") return true

      // Show advanced commands only if unlocked
      if (cmd.tier === "advanced" && !advancedUnlocked) return false

      // Show secret commands only if hints are showing
      if (cmd.tier === "secret" && !showingHints) return false

      return true
    })
    .filter((cmd) => cmd.name.toLowerCase().startsWith(query))
    .map((cmd) => cmd.name)
    .slice(0, 5)
}
