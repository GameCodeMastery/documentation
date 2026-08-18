---
title: How to Get Technical Support
description: Where to get technical support for Game Code Mastery products — forum, email, and Discord — what to include, and how the Discord Helper role works.
aliases:
  - How to Get Support
  - How to Get Help
---
# How to Get Technical Support

The Game Code Mastery support system is designed to provide a robust support solution so more people get actual developer answers, not fewer. Questions are tracked in one place instead of getting buried, which makes it possible to manage support at a larger scale without leaving people waiting in a thread that never gets seen.

> [!TIP]
> Read the docs and search first. A large share of questions are already answered in Setup guides, Usage guides, or the [[FAQ and Troubleshooting|AARPG FAQ]].

---

## Where to ask

| You want… | Go here |
| --- | --- |
| Fast developer response (forum) | **[Help](https://discuss.gamecodemastery.com/c/help/6)** on the [official forum](https://discuss.gamecodemastery.com) |
| Fast developer response (email) | **support@gamecodemastery.com** |
| Community help, quicker back-and-forth | [Game Code Mastery Discord](https://discord.gg/g2J8H2mPbj) |
| Known issues / update notes | Forum **[Announcements](https://discuss.gamecodemastery.com/c/announcements/5)** |
| Feature requests and product suggestions | Forum **[Feedback](https://discuss.gamecodemastery.com/c/feedback/10)** |

Do **not** open issues on the [support tracker](https://github.com/GameCodeMastery/support/issues) yourself. That tracker is the Helper intake queue — not a place to submit your question.

---

## Official support forum

The official support forum is powered by Discourse: [https://discuss.gamecodemastery.com](https://discuss.gamecodemastery.com)

This is where I'll be looking first. Questions posted in **Help** get developer attention first: [https://discuss.gamecodemastery.com/c/help/6](https://discuss.gamecodemastery.com/c/help/6)

Use the right category:

| Category | Use it for |
| --- | --- |
| **[Help](https://discuss.gamecodemastery.com/c/help/6)** | Support questions and issue reports (read the topic template) |
| **[FAQ and Tutorials](https://discuss.gamecodemastery.com/c/faq-and-tutorials/7)** | Guides, reusable answers, how-tos |
| **[Announcements](https://discuss.gamecodemastery.com/c/announcements/5)** | Official news, updates, known issues |
| **[Feedback](https://discuss.gamecodemastery.com/c/feedback/10)** | Product / docs / forum suggestions and feature discussion |
| **[GCM Community](https://discuss.gamecodemastery.com/c/gcm-community/12)** | Introductions, showcases, community chat |
| **[General](https://discuss.gamecodemastery.com/c/general/4)** | Topics that don't fit elsewhere |
| **[Offtopic](https://discuss.gamecodemastery.com/c/offtopic/13)** | Everything else |

New here? Start with **New users start here** in [FAQ and Tutorials](https://discuss.gamecodemastery.com/c/faq-and-tutorials/7).

---

## Email

Email is also checked and maintained often, so it's another way to get fast developer support.

support@gamecodemastery.com

Include the same details you would put in a forum post: product, engine version, whether it happens in the demo or your project, repro steps, expected vs actual behavior, and relevant log text.

The forum is still the better place when you want the answer to be public and searchable for the rest of the community. Use email when you prefer a private conversation, or just prefer writing it that way.

---

## Discord

While the forum is preferred, Discord is still a valid place to ask. The community can jump in, and I will still answer Discord questions.

Helpers watch Discord for questions that need a developer response and file them on the support tracker so they don't get lost. That is why Discord answers from me may be fewer and slower than the forum, not because Discord is ignored.

Invite: [https://discord.gg/g2J8H2mPbj](https://discord.gg/g2J8H2mPbj)

---

## Before you ask

1. **Search.** Check this documentation, the [[FAQ and Troubleshooting|AARPG FAQ]], and existing forum Help topics.
2. **Read the relevant Setup / Usage guide** for the system you're using.
3. **Reproduce in the included demo** when the question is about a purchased product. If it fails in the demo too, say so. If it only fails in your project, that's usually setup or integration.
4. **One problem per topic** when you can.

---

## What to include

Clear reports get clearer answers. Include:

- **Product** (e.g. Advanced ARPG Combat) and **product / build version**
- **Unreal Engine version**
- Whether it happens in the **demo project**, **your project**, or both
- **Exact steps to reproduce**
- **Expected vs actual** behavior
- Relevant **Output Log text** (paste text in a code block — not only a screenshot)
- What you already tried from the docs

**Good title:** `UE 5.4: melee montage plays but collision never hits after migrate`

**Bad title:** `Help` / `Broken` / `Combat`

> [!WARNING]
> Vague reports with no engine version, no repro steps, and no demo-vs-your-project distinction are hard to answer accurately.

For Advanced ARPG Combat, also see [[FAQ and Troubleshooting]] — it has the full diagnostic checklist and the most common migration failures (Gameplay Tags, plugins, Game Mode / Game Instance, collision, surfaces).

---

## Discord Helper role

Helpers are **not** expected to answer questions. That's not the role.

The role is Discord-only. The forum doesn't need it — I work that queue myself.

### What Helpers do

1. Find a question in Discord that needs a developer response
2. Open an issue on the Game Code Mastery support tracker: [https://github.com/GameCodeMastery/support/issues](https://github.com/GameCodeMastery/support/issues)
3. Paste the **full question** + a **direct link** to the Discord post

That's it. No answering, no interacting with the user, no technical support on my behalf. This gives us a centralized place to actively track and more easily manage support questions.

When filing an issue, use this shape:

```markdown
## Source
<direct link to the Discord post>

## Question
<paste the full question — don't summarize>
```

### Want the Helper role?

Get in contact with me or **motion_potion** on Discord with your **GitHub username**. You'll need a GitHub account so I can give you access to the support tracker.

Low time commitment. High impact.
