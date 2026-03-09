"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"

// ライブ写真のデータ
// TODO: 実際の写真を /public/images/live/ に追加してパスを更新してください
const livePhotos = [
  { id: 1, src: "/images/live/day1.jpg", alt: "day1", caption: "Day 1 顔合わせ" },
  { id: 2, src: "/images/live/day2.jpg", alt: "day2", caption: "Day2 顔合わせ" },
  { id: 3, src: "/images/live/gakuya.jpg", alt: "gakuya", caption: "楽屋" },
  { id: 4, src: "/images/live/takuya.jpg", alt: "takuya", caption: "在校生" },
  { id: 5, src: "/images/live/amp.jpg", alt: "amp", caption: "ベースアンプ" },
  { id: 6, src: "/images/live/gohan.jpg", alt: "gohan", caption: "打ち上げ" },
]

export function LiveReport() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="live-report" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">
            LIVE REPORT
          </h2>
          <div className="w-16 h-px bg-primary mb-8 mx-auto" />
          <p className="text-2xl md:text-3xl font-bold mb-4">
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
          </p>
        </motion.div>

        {/* 写真ギャラリー */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {livePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-4/3 overflow-hidden rounded-lg border border-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              {/* 画像 */}
              <div className="relative w-full h-full bg-primary/5">
                {/* プレースホルダー（実際の写真がない場合） */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-sm">写真を追加してください</p>
                    <p className="text-xs mt-2 text-muted-foreground/60">
                      {photo.src}
                    </p>
                  </div>
                </div>
                
                {/* 実際の画像を使用する場合はコメントを外してください */}
                { <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                /> }
              </div>

              {/* キャプションオーバーレイ */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm md:text-base">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* ホバーエフェクト */}
              <motion.div
                className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
