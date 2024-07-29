//export function processVideo(videoUrl: string, width: number, height: number, fps: number = 5) {
//  return new Promise((resolve, reject) => {
//    const video = document.createElement('video')
//    video.src = videoUrl
//    video.crossOrigin = 'anonymous'
//
//    const canvas = document.createElement('canvas')
//    canvas.width = width
//    canvas.height = height
//		const ctx = canvas.getContext('2d')
//
//    const matrixResults = []
//    let lastCaptureTime = 0
//    const captureInterval = 1000 / fps
//
//    video.onloadedmetadata = () => {
//      video.play()
//    }
//
//    video.onended = () => {
//      resolve(matrixResults)
//    }
//
//    function ca      if (video.ended) return
//
//      if (timestamp - lastCaptureTime >= captureInterval) {
//        ctx.drawImage(video, 0, 0, width, height)
//        const imageData = ctx.getImageData(0, 0, width, height).data
//        const dotMatrix = imageTo  matrixResults.push(dotMatrix)
//        lastCaptureTime = timestamp
//      }
//
//      requestAnimationFrame(captureFrame)
//    }
//
//    video.onplay = () => {
//      requestAnimationFrame(captureFrame)
//    }
//
//    video.onerror = reject
//  })
//}

export function imageToDotMatrix (
		imageData: ImageData,
		width: number,
		height: number,
		threshold: number = 128
) {
  const dotMatrix = []

  for (let y = 0; y < height; y++) {
    const row = []
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const gray = (imageData[index] + imageData[index + 1] + imageData[index + 2]) / 3
      row.push(gray > threshold)
    }
    dotMatrix.push(row)
  }
  return dotMatrix
}
