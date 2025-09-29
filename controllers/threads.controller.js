import prisma from "../config/prisma.js"
import createError from "../utils/createError.js"
import redisClient from "../config/redis.js"
import { json } from "express"
export const createThread = async (req, res, next) => {
  try {
    const { user_id, title, body, cat_id } = req.body
    if (!user_id) {
      return createError(400, "Please enter the userId")
    }
    if (!title) {
      return createError(400, "Please enter the Title")
    }
    if (!body) {
      return createError(400, "Please enter the Thead")
    }
    if (!cat_id) {
      return createError(400, "Please select the Category")
    }
    await prisma.threads.create({
      data: {
        user_id,
        title,
        body,
        cat_id
      }
    })
    await redisClient.del('thread')
    res.json({ msg: "createthread success" })
  } catch (error) {
    next(error)
  }
}
export const removethread = async (req, res, next) => {
  try {
    const { thread_id } = req.body
    if (!thread_id) {
      return createError(400, "Please enter the TheadId")
    }
    await prisma.threads.update({
      where: {
        thread_id
      },
      data: {
        is_deleted: true
      }
    })
    await redisClient.del('thread')
    res.json({ msg: "deletethread success" })
  } catch (error) {
    next(error)
  }
}
export const updatethread = async (req, res, next) => {
  try {
    const { thread_id, body } = req.body
    if (!thread_id) {
      return createError(400, "Please enter the TheadId")
    }
    if (!body) {
      return createError(400, "Please enter the updateThead")
    }
    await prisma.threads.update({
      where: {
        thread_id
      },
      data: {
        body,
        updated_at: new Date()
      }
    })
    await redisClient.del('thread')
    res.json({ msg: "updatethread success" })
  } catch (error) {
    next(error)
  }
}
export const listthread = async (req, res, next) => {
  try {
    const threadCache = await redisClient.get('thread')
    if (threadCache) {
      return res.json(JSON.parse(threadCache))
    }
    const threads = await prisma.threads.findMany()
    await redisClient.setEx('thread', 3600, JSON.stringify(threads, null, 4))
    res.json(threads)
  } catch (error) {
    next(error)
  }
}
export const lockthread = async (req, res, next) => {
  try {
    const { thread_id } = req.body
    if (!thread_id) {
      return createError(400, "Please enter the TheadId")
    }
    await prisma.threads.update({
      where: {
        thread_id
      },
      data: {
        is_locked: true
      }
    })
    await redisClient.del('thread')
    res.json({ msg: "lockthread success" })
  } catch (error) {
    next(error)
  }
}
export const unlockthread = async (req, res, next) => {
  try {
    const { thread_id } = req.body
    if (!thread_id) {
      return createError(400, "Please enter the TheadId")
    }
    await prisma.threads.update({
      where: {
        thread_id
      },
      data: {
        is_locked: false
      }
    })
    await redisClient.del('thread')
    res.json({ msg: "unlockthread success" })
  } catch (error) {
    next(error)
  }
}
export const readthread = async (req, res, next) => {
  try {
    const { thread_id } = req.params
    if (!thread_id) {
      return createError(400, "Please enter the TheadId")
    }
    const thread = await prisma.threads.findFirst({
      where: {
        thread_id: parseInt(thread_id)
      }
    })
    res.json(thread)
  } catch (error) {
    next(error)
  }
}
export const amounthreads = async (rea, res, next) => {
  try {
    const thread = await prisma.threads.findMany()
    let count = 0
    thread.map((c) => {
      if (c.is_deleted === false)
        count++
    })
    res.json({ amounthread: count })
  } catch (error) {

  }
}
export const searchthread = async (req, res, next) => {
  try {
    const { title } = req.params
    const thread = await prisma.threads.findMany({
      where: {
        title: {
          startsWith: title,
        },
      },
    });
    res.json(thread)
  } catch (error) {
    next(error)
  }
}
