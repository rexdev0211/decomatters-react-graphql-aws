const determineProgressForTasks = (taskRecord, welcomeRecord, uniqueDisplayName) => {
  const {
    rewardedDtIds: rewardedTasks,
    numLikes: numberLikes,
    numFollows: numberFollows,
    numGifts: numberGifts,
    challenge: challenge,
    designWithBrand: challengeWithRequirements
  } = taskRecord

  const joinedNewUserChallenge = welcomeRecord ? welcomeRecord.joinedNewUserChallenge : false

  const rewardedWelcomeTasks = welcomeRecord ? welcomeRecord.rewardedWgIds : []

  const dailyTaskStatus = {
    ffTFgusCfz: null, // Daily Challenge,
    rcIEBNmaSr: null, // Challenge with Requirement,
    '1axAkTN3zc': null, // Like Designs,
    Xr4CyGw6Jb: null, // Virtual Gift,
    kmEXaEWYFG: null, // FollowDesingers,
    '8GORtOEbeF': null, // CreateUsername,
    dIEQgLxtpw: null // NewUserChallenge,
  }

  const getProgressForTask = taskId => {
    const calculateProgress = (completed, needed) => {
      let progress = {
        percentComplete: Math.min(completed / needed, 1) // Limit the percent complete to 1 (100%). No credit for extra likes!
      }
      if (
        (rewardedTasks && rewardedTasks.includes(taskId)) ||
        rewardedWelcomeTasks.includes(taskId)
      ) {
        progress.status = 'claimed'
        progress.percentComplete = 0 // hide the red part of progress bar
        progress.disabled = true
        progress.text = `${needed}/${needed}`
      } else if (completed >= needed) {
        progress.text = `${needed}/${needed}`
        progress.status = 'claimable'
        progress.disabled = false
      } else {
        progress.text = `${completed}/${needed}`
        progress.status = 'open'
        progress.disabled = false
      }
      return progress
    }

    switch (taskId) {
      case '1axAkTN3zc': // Like users designs
        return calculateProgress(numberLikes || 0, 10) // These values may not be in the task record if they would be at zero, so it's necessary to replace undefined with zero.
      case 'kmEXaEWYFG': // Follow Other Designers
        return calculateProgress(numberFollows || 0, 5)
      case 'ffTFgusCfz': // Join Daily Challenge
        return calculateProgress(challenge || 0, 1) // Boolean true values like challenge will be coerced to 1 in determine progress.
      case 'rcIEBNmaSr': // Challenge Requirement
        return calculateProgress(challengeWithRequirements || 0, 1)
      case 'Xr4CyGw6Jb': // Virtual Gift
        return calculateProgress(numberGifts || 0, 10)
      case '8GORtOEbeF': // Create Username
        return calculateProgress(uniqueDisplayName != null, 1) // displayName is not equal to null or undefined
      case 'dIEQgLxtpw': // New User Challenge
        return calculateProgress(joinedNewUserChallenge || 0, 1)
      default:
        return { disabled: false, text: '-/-', percentComplete: 0 }
    }
  }

  Object.keys(dailyTaskStatus).forEach(
    taskId => (dailyTaskStatus[taskId] = getProgressForTask(taskId))
  )

  return dailyTaskStatus
}

export default determineProgressForTasks
