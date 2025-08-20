"use client"

import type React from "react"
import { projects } from "@/content/projects"
import { logs } from "@/content/logs"
import { writingPosts } from "@/content/writing"
import { EasterEggs } from "./easter-eggs"

export interface CommandResult {
  content: React.ReactNode
  type?: "command" | "error" | "success"
}

export interface Command {
  name: string
  description: string
  category: "Core" | "Utilities" | "Easter Eggs"
  execute: (args: string[]) => CommandResult
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

// Core Commands
const coreCommands: Command[] = [
  {
    name: "help",
    description: "Show available commands",
    category: "Core",
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-terracotta font-semibold">Available commands</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-sage font-medium mb-1">Core:</h4>
              <p className="text-sm">about, now, projects, writing, whativedone, resume, contact</p>
            </div>
            <div>
              <h4 className="text-sage font-medium mb-1">Utilities:</h4>
              <p className="text-sm">
                search &lt;term&gt;, open &lt;slug&gt;, ls, cat &lt;slug&gt;, clear, history, alias &lt;a&gt;=&lt;b&gt;,
                theme &lt;dark|light|auto&gt;, subscribe, share
              </p>
            </div>
            <div>
              <h4 className="text-sage font-medium mb-1">Easter Eggs:</h4>
              <p className="text-sm">
                turntable, linkinpark, vinyl, slapbump, tapout, oss, rangoli, entropy, meditation, polymath, compile,
                deploy, matrix, 404, southindia, bengaluru, wanderer, coinflip, dice, fortune, glitch, portal
              </p>
            </div>
          </div>
          <p className="text-sage/70 text-sm mt-4">Tip: press ⌘K (or tap ✨) for the command palette.</p>
        </div>
      ),
    }),
  },
  {
    name: "about",
    description: "Learn about Dhruva",
    category: "Core",
    execute: () => ({
      content: (
        <div className="space-y-3">
          <p>I'm Dhruva — Creative Technologist & Product Builder.</p>
          <p className="text-terracotta font-medium">I build product for people I care about.</p>
          <p>
            I work at the intersection of technology, culture, and sport—designing systems where communities thrive.
          </p>
          <div className="mt-4 space-x-4 text-sm">
            <span className="text-sage">→</span>
            <a
              href="#"
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "projects" }))}
              className="text-terracotta hover:underline"
            >
              projects
            </a>
            <a
              href="#"
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "writing" }))}
              className="text-terracotta hover:underline"
            >
              writing
            </a>
            <a
              href="#"
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "contact" }))}
              className="text-terracotta hover:underline"
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
    execute: () => ({
      content: (
        <div className="space-y-2">
          <p>
            Now: Building Graicie (AI Jiu-Jitsu), refining CultureCo (creator commerce), and shipping a terminal website
            refresh. Training no‑gi, writing short meditations, and experimenting with fractal rangoli.
          </p>
          <p className="text-sage text-sm">Updated: {new Date().toLocaleDateString()}</p>
        </div>
      ),
    }),
  },
  {
    name: "projects",
    description: "View project portfolio",
    category: "Core",
    execute: () => ({
      content: (
        <div className="space-y-6">
          {["AI", "Web3", "Culture", "Sport"].map((cluster) => {
            const clusterProjects = projects.filter((p) => p.cluster === cluster)
            if (clusterProjects.length === 0) return null

            return (
              <div key={cluster}>
                <h4 className="text-terracotta font-medium mb-3">{cluster}</h4>
                <div className="space-y-2">
                  {clusterProjects.map((project) => (
                    <div key={project.slug} className="text-sm">
                      <span className="text-bone font-medium">{project.title}</span>
                      <span className="text-sage mx-2">•</span>
                      <span className="text-sage">{project.year}</span>
                      <span className="text-sage mx-2">•</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          project.status === "Active"
                            ? "bg-olive/20 text-olive"
                            : project.status === "Concept"
                              ? "bg-ochre/20 text-ochre"
                              : "bg-sage/20 text-sage"
                        }`}
                      >
                        {project.status}
                      </span>
                      <p className="text-sage/80 mt-1">{project.summary}</p>
                      {project.links.length > 0 && (
                        <div className="mt-1 space-x-2">
                          {project.links.map((link) => (
                            <a key={link.label} href={link.href} className="text-terracotta text-xs hover:underline">
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
    execute: () => ({
      content: (
        <div className="space-y-4">
          <h3 className="text-terracotta font-semibold">Writing</h3>
          <div className="space-y-3">
            {writingPosts.map((post) => (
              <div key={post.slug} className="border-l-2 border-sage/30 pl-4">
                <h4 className="text-bone font-medium">{post.title}</h4>
                <p className="text-sage/80 text-sm mt-1">{post.excerpt}</p>
                <div className="mt-2 text-xs text-sage">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("terminal-command", { detail: `open ${post.slug}` }))
                    }
                    className="text-terracotta hover:underline"
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
          <h3 className="text-terracotta font-semibold">What I've Done</h3>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.date} className="border-l-2 border-olive/30 pl-4">
                <h4 className="text-olive font-medium">{log.date}</h4>
                <ul className="mt-2 space-y-1">
                  {log.bullets.map((bullet, index) => (
                    <li key={index} className="text-sm text-sage/80">
                      <span className="text-sage mr-2">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                {log.links && log.links.length > 0 && (
                  <div className="mt-2 space-x-2">
                    {log.links.map((link) => (
                      <a key={link.label} href={link.href} className="text-terracotta text-xs hover:underline">
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
              <span className="text-sage">Role:</span> Creative Technologist & Product Builder
            </p>
            <p>
              <span className="text-sage">Focus:</span> AI, Web3, community systems
            </p>
            <p>
              <span className="text-sage">Global:</span> India ↔ US
            </p>
          </div>
          <div className="space-x-4">
            <a href="#" className="text-terracotta hover:underline">
              Download PDF
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("terminal-command", { detail: "open resume" }))}
              className="text-sage hover:underline"
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
    execute: () => ({
      content: (
        <div className="space-y-3">
          <p>
            <span className="text-sage">Email:</span> hi@dhruva.life
          </p>
          <p>
            <span className="text-sage">Socials:</span> X/Twitter (@arenatwox), LinkedIn (/in/dhruva), Instagram
            (@dhruva)
          </p>
          <p>
            <span className="text-sage">Book a chat:</span>{" "}
            <a href="#" className="text-terracotta hover:underline">
              link placeholder
            </a>
          </p>
          <p>
            <span className="text-sage">Open ports:</span> 25 (SMTP), 443 (TLS), 8000 (dev)
          </p>
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
            <p className="text-terracotta">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for "{term}":
            </p>
            {results.map((result, index) => (
              <div key={index} className="border-l-2 border-sage/30 pl-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-sage/20 text-sage px-2 py-1 rounded">{result.type}</span>
                  <span className="text-bone font-medium">{result.title}</span>
                </div>
                <p className="text-sage/80 text-sm mt-1">{result.content}</p>
                {result.slug && (
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("terminal-command", { detail: `open ${result.slug}` }))
                    }
                    className="text-terracotta text-xs hover:underline mt-1"
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
                <h3 className="text-terracotta font-semibold text-lg">{project.title}</h3>
                <span className="text-xs bg-sage/20 text-sage px-2 py-1 rounded">{project.cluster}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.status === "Active"
                      ? "bg-olive/20 text-olive"
                      : project.status === "Concept"
                        ? "bg-ochre/20 text-ochre"
                        : "bg-sage/20 text-sage"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sage">{project.year}</p>
              <p>{project.summary}</p>
              {project.links.length > 0 && (
                <div className="space-x-3">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.href} className="text-terracotta hover:underline">
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
              <h3 className="text-terracotta font-semibold text-lg">{post.title}</h3>
              <p className="text-sage text-sm">{post.date}</p>
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
              <h3 className="text-terracotta font-semibold text-lg">Dhruva Chakravarthi</h3>
              <p className="text-sage">Creative Technologist & Product Builder</p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-bone font-medium">Focus Areas</h4>
                  <p className="text-sage/80">
                    AI systems, Web3 infrastructure, community platforms, sports technology
                  </p>
                </div>

                <div>
                  <h4 className="text-bone font-medium">Current Projects</h4>
                  <ul className="text-sage/80 space-y-1">
                    <li>• Graicie - AI training assistant for Jiu-Jitsu</li>
                    <li>• CultureCo - Creator commerce for Indian artists</li>
                    <li>• ArenaTwo - Fan-driven football league concept</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-bone font-medium">Philosophy</h4>
                  <p className="text-sage/80">
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
    execute: () => ({
      content: (
        <div className="space-y-2">
          <p className="text-sage">Directories:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-terracotta">/about</div>
            <div className="text-terracotta">/projects</div>
            <div className="text-terracotta">/writing</div>
            <div className="text-terracotta">/logs</div>
            <div className="text-terracotta">/resume</div>
            <div className="text-terracotta">/contact</div>
          </div>
        </div>
      ),
    }),
  },
  {
    name: "cat",
    description: "Print raw content",
    category: "Utilities",
    execute: (args) => {
      const slug = args[0]
      if (!slug) {
        return { content: "Usage: cat <slug>", type: "error" }
      }

      const post = writingPosts.find((p) => p.slug === slug)
      if (post) {
        return {
          content: (
            <pre className="whitespace-pre-wrap text-sm text-sage/80">
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
    execute: () => {
      const history = JSON.parse(localStorage.getItem("terminal-history") || "[]")
      if (history.length === 0) {
        return { content: "No command history", type: "error" }
      }

      return {
        content: (
          <div className="space-y-1">
            <p className="text-sage">Last {Math.min(10, history.length)} commands:</p>
            {history.slice(-10).map((cmd: string, index: number) => (
              <div key={index} className="text-sm">
                <span className="text-sage/60 mr-2">{history.length - 10 + index + 1}</span>
                <span className="text-bone">{cmd}</span>
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
              <p className="text-sage">Current aliases:</p>
              {Object.entries(aliases).map(([alias, command]) => (
                <div key={alias} className="text-sm">
                  <span className="text-terracotta">{alias}</span>
                  <span className="text-sage mx-2">=</span>
                  <span className="text-bone">{command}</span>
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
    execute: () => ({
      content: (
        <div className="space-y-3">
          <p className="text-terracotta">Subscribe for updates</p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-sage/10 border border-sage/30 rounded px-3 py-2 text-bone placeholder-sage/50 flex-1"
            />
            <button className="bg-terracotta hover:bg-terracotta/80 text-bone px-4 py-2 rounded">Subscribe</button>
          </div>
          <p className="text-sage/60 text-sm">Get notified about new projects and writing.</p>
        </div>
      ),
    }),
  },
  {
    name: "share",
    description: "Share current terminal state",
    category: "Utilities",
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

// Combine all commands
const allCommands = [...coreCommands, ...utilityCommands, ...EasterEggs]

// Command execution function
export function setExecuteCommand(fn: (command: string) => void) {
  window.addEventListener("terminal-command", (event: CustomEvent) => {
    fn(event.detail)
  })
}

export function executeCommand(input: string): CommandResult {
  const [commandName, ...args] = input.trim().split(" ")

  // Check aliases first
  const aliases = getAliases()
  const resolvedCommand = aliases[commandName] || commandName

  const command = allCommands.find((cmd) => cmd.name === resolvedCommand)

  if (!command) {
    return {
      content: `Command not found: ${commandName}. Type 'help' for available commands.`,
      type: "error",
    }
  }

  try {
    return command.execute(args)
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

export function getCommandSuggestions(input: string): string[] {
  const query = input.toLowerCase()
  return allCommands
    .filter((cmd) => cmd.name.toLowerCase().startsWith(query))
    .map((cmd) => cmd.name)
    .slice(0, 5)
}
