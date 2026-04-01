"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Linkedin, Instagram, Menu, X, Home, Mail, Grid2x2, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Description } from "@radix-ui/react-dialog"
import { title } from "process"

// ============================================
// CONFIGURATION SECTION - Easy to customize
// ============================================

// Slideshow Configuration: Manually select which projects to display in the Home slideshow
// Add or remove project IDs to customize which projects appear
const SLIDESHOW_PROJECT_IDS = [1, 8, 9, 5, 6, 22, 31,] // Goblin, Mahmutcan, Robot, MOCH 107, Premium Audio, Gif animations

// Number of projects to display simultaneously
const SLIDESHOW_PROJECTS_TO_SHOW = 3 // Desktop: 3 projects, Mobile: 1 project

// Slideshow auto-advance interval (milliseconds)
const SLIDESHOW_INTERVAL = 3000 // 3 seconds

// ============================================


const categories = [
  "Home",
  "The Bulb",
  "Lightsout",
  "VFX",
  "Environment",
  "Prompt",
  "Product Design",
  "Character",
  "Game Design",
  "Abstract",
  "Gif",
]

const projects = {
  Home: [],
  VFX: [
    {
      id: 46,
      items: [
        {
          type: "video",
          src: "/assets/vfx/hangar_vfx_deneme_blender0001-0060.mp4",
        },
      ],
      title: "Hangar VFX",
      description: "Hangar environment and tracking attempt in Blender.",
      orientation: "horizontal",
    },
    {
      id: 45,
      items: [
        {
          type: "video",
          src: "/assets/vfx/weareready_breakdown.mp4",
        },
      ],
      title: "We Are Ready – VFX Breakdown",
      description: "Behind-the-scenes VFX breakdown showcasing compositing, tracking, and visual effects pipeline from start to final render.",
      orientation: "horizontal",
    },
    {
      id: 11,
      items: [
        {
          type: "video",
          src: "/assets/environment/environment_vfx.mp4",
        },
      ],
      title: "Environment VFX",
      description: "Blender camera track and vfx work",
      orientation: "horizontal",
    },
  ],
  Abstract: [
    {
      id: 47,
      items: [
        {
          type: "video",
          src: "/assets/abstract/concfruite_low2.mp4",
        },
      ],
      title: "Concrete Fruit",
      description: "Abstract flow and simulation loop.",
      orientation: "vertical",
    },
    {
      id: 1,
      items: [
        {
          type: "video",
          src: "/assets/abstract/abstract_anim.mp4",
        },

      ],
      title: "Ball and Cloth",
      description: "Amazing big ball vs my grandpa's cloth.",
      orientation: "vertical",
    },


    {
      id: 3,
      items: [
        {
          type: "video",
          src: "/assets/abstract/abstract_balls.mp4",
        },

      ],
      title: "Balls Dropping",
      description: "Balls with no meaning.",
      orientation: "vertical",
    },
    {
      id: 4,
      items: [
        {
          type: "video",
          src: "/assets/abstract/abstract_wallpaper_loop.mp4",
        },

      ],
      title: "metrix",
      description: "Fkn Matrix vibes",
      orientation: "vertical",
    },
  ],
  Character: [
    {
      id: 5,
      items: [
        {
          type: "image",
          src: "/assets/character/character_goblin1.jpg",
        },
        {
          type: "image",
          src: "/assets/character/character_goblin2.jpg",
        },
        {
          type: "image",
          src: "/assets/character/character_goblin3.jpg",
        },
      ],
      title: "Goblin Character",
      description:
        "3D rendered fantasy goblin character collection with detailed textures, crown accessory, and multiple color variants in forest environment.",
      itemDescriptions: [
        "Primary goblin render – Detailed skin textures and forest lighting with hand-painted crown accessory.",
        "Alternate color variant – Swamp-toned goblin with mossy undertones and weathered armor details.",
        "Dark variant – Night-stalker goblin with glowing eyes and battle-scarred skin under moonlight.",
      ],
      orientation: "vertical",
    },
    {
      id: 6,
      items: [
        {
          type: "image",
          src: "/assets/character/character_mahmutcan.png",
        },
      ],
      title: "Mahmutcan",
      description: "Colorful 3D character design with blue spiky hair and vibrant clothing on clean background.",
      orientation: "vertical",
    },
    {
      id: 7,
      items: [
        {
          type: "video",
          src: "/assets/character/character_robot.mp4",
        },
      ],
      title: "Robot Character",
      description: "Animated robot character with dynamic movement and mechanical design elements.",
      orientation: "vertical",
    },
  ],
  Environment: [
    {
      id: 8,
      items: [
        {
          type: "video",
          src: "/assets/environment/environment_arcrender.mp4",
        },
      ],
      title: "Arc Valley",
      description: "Unreal Engine 5.4 Valley Environment Design\nUnreal Engine 5.4.4\nUsed Quixel Bridge Megascan\nColor grade and edit: Premiere Pro"
      ,
      orientation: "horizontal",
    },
    {
      id: 9,
      items: [
        {
          type: "video",
          src: "/assets/environment/environment_ocean.mp4",
        },
      ],
      title: "Stormy Seas",
      description:
        "Realistic Ocean Fisheye Render – Animation, simulation & render: Blender | Edit & color: Premiere Pro | SoundFX: Soundly",
      orientation: "horizontal",
    },
    {
      id: 10,
      items: [
        {
          type: "video",
          src: "/assets/environment/environment_bardforest.mp4",
        },
      ],
      title: "Bard Forest",
      description:
        "Realistic Barn – Unreal Engine 5.1 | Used Quixel Megascan Presets | Color grade & edit: DaVinci Resolve | SoundFX: Soundly",
      orientation: "horizontal",
    },
    {
      id: 12,
      items: [
        {
          type: "image",
          src: "/assets/environment/environment_1.png",
        },
      ],
      title: "MAOI",
      description:
        "Maoi & Greenery – Realistic Environment Design | Created in Blender | Used Quixel Megascan assets | Color grade & edit: DaVinci Resolve",
      orientation: "horizontal",
    },
    {
      id: 13,
      items: [
        {
          type: "image",
          src: "/assets/environment/environment_dabbe.png",
        },
      ],
      title: "Dabbe",
      description:
        "POV Interior Design – Realistic Fisheye Render | Created in Blender | Lighting & materials focused on realism | Color grade & edit: DaVinci Resolve",
      orientation: "horizontal",
    },
    {
      id: 14,
      items: [
        {
          type: "image",
          src: "/assets/environment/environment_oda.png",
        },
      ],
      title: "Music Studio",
      description:
        "Music Studio Environment – Realistic Interior Scene | Created in Blender | Focused on lighting, materials & atmosphere | Color grade & edit: DaVinci Resolve",
      orientation: "horizontal",
    },

  ],
  "Game Design": [
    {
      id: 15,
      items: [
        {
          type: "video",
          src: "/assets/gamedesign/gamedesign_lowlight_anim-1.mp4",
        },
      ],
      title: "Character Animation",
      description: "Procrate Character Animation 2d",
      orientation: "vertical",
    },
    {
      id: 16,
      items: [
        {
          type: "video",
          src: "/assets/gamedesign/gamedesign_lowlight_anim-2.mp4",
        },
      ],
      title: "Jumpscare Animation",
      description: "Procrate Jumpscare Animation 2d",
      orientation: "vertical",
    },
    {
      id: 17,
      items: [
        {
          type: "image",
          src: "/assets/gamedesign/gamedesign_lowlight_photo.jpg",
        },
      ],
      title: "Environment Design",
      description: "Blender Environment Design 3d to 2d",
      orientation: "vertical",
    },
  ],
  Gif: [
    {
      id: 18,
      items: [
        {
          type: "video",
          src: "/assets/gif/gif_dayi.mp4",
        },
      ],
      title: "The Judging Dayı",
      description: "He mirrors society itself; in condemning others, he confronts his own reflection.",
      orientation: "vertical",
    },
    {
      id: 19,
      items: [
        {
          type: "video",
          src: "/assets/gif/gif_dayi2.mp4",
        },
      ],
      title: "The Waiting Dayı",
      description: "At a point where time no longer flows, he learns only to breathe.",
      orientation: "vertical",
    },
    {
      id: 20,
      items: [
        {
          type: "video",
          src: "/assets/gif/gif_amcas1.mp4",
        },
      ],
      title: "The Content Dayı",
      description: "In a fleeting moment of peace, the weight of existence softens.",
      orientation: "vertical",
    },
    {
      id: 21,
      items: [
        {
          type: "video",
          src: "/assets/gif/gif_amcas.mp4",
        },
      ],
      title: "The Unhinged Man",
      description: "Beyond the edge of reason, it is not madness—only the naked truth.",
      orientation: "vertical",
    },
    {
      id: 22,
      items: [
        {
          type: "video",
          src: "/assets/gif/gif_karakter5.mp4",
        },
      ],
      title: "Character Animation",
      description: "Second animated sequence featuring character movement and expressive animation.",
      orientation: "vertical",
    },
  ],
  Lightsout: [
    {
      id: 23,
      items: [
        {
          type: "image",
          src: "/assets/lightstout/ligthsout_poster2.png",
        },
      ],
      title: "Poster",
      description: "Official poster design for the Lightsout animated short – Typography, composition, and mood-driven visual storytelling.",
      orientation: "horizontal",
    },
    {
      id: 24,
      items: [
        {
          type: "image",
          src: "/assets/lightstout/lighstout_storyboard.png",
        },
      ],
      title: "Storyboard",
      description: "Scene-by-scene storyboard layout mapping out camera angles, transitions, and narrative flow for the short film.",
      orientation: "horizontal",
    },
    {
      id: 25,
      items: [
        {
          type: "image",
          src: "/assets/lightstout/ligthsout_karakter1.png",
        },
      ],
      title: "Character Design",
      description: "Main character concept art – Silhouette studies, expression sheets, and final design with color palette exploration.",
      orientation: "horizontal",
    },
    {
      id: 26,
      items: [
        {
          type: "image",
          src: "/assets/lightstout/lightsout_mekan1r.png",
        },
        {
          type: "image",
          src: "/assets/lightstout/ligthsout_mekan1s.png",
        },
        {
          type: "image",
          src: "/assets/lightstout/ligthsout_mekan2r.png",
        },
        {
          type: "image",
          src: "/assets/lightstout/ligthsout_mekan2s.png",
        },
      ],
      title: "Environment",
      description: "Interior and exterior environment designs for the Lightsout universe – Blender renders with atmospheric lighting.",
      itemDescriptions: [
        "Primary room render – Warm interior lighting with detailed props and lived-in atmosphere.",
        "Primary room sketch – Initial line art and spatial planning for the main setting.",
        "Secondary location render – Contrasting cold-toned environment with dramatic shadow play.",
        "Secondary location sketch – Compositional studies and perspective guides for the alternate scene.",
      ],
      orientation: "horizontal",
    },

  ],
  "Product Design": [
    {
      id: 48,
      items: [
        {
          type: "video",
          src: "/assets/product/carweirdoshoodie2.mp4",
        },
      ],
      title: "Car Weirdos Hoodie",
      description: "3D product animation for Car Weirdos hoodie apparel.",
      orientation: "vertical",
    },
    {
      id: 27,
      items: [
        {
          type: "video",
          src: "/assets/product/product_karadutvid.mp4",
        },
      ],
      title: "KARADUT AD",
      description:
        "Karadut juice is a popular drink among health-conscious consumers. As a 3D animator, I created a video using Blender, After Effects, Premiere Pro, and Adobe Illustrator to promote this delicious and healthy drink. The video showcases the process of making Karadut juice and features dynamic typography and transition effects.",
      orientation: "vertical",
    },
    {
      id: 31,
      items: [
        {
          type: "image",
          src: "/assets/product/product_karadut1.png",
        },
        {
          type: "image",
          src: "/assets/product/product_karadut2.png",
        },
        {
          type: "image",
          src: "/assets/product/product_karadut3.png",
        },
      ],
      title: "KARADUT",
      description:
        "Premium black mulberry juice packaging designs with creative beverage photography, floating fruits, and nutritional branding.",
      itemDescriptions: [
        "Hero packaging shot – Floating mulberry fruits with dramatic splash highlighting the natural ingredient story.",
        "Label close-up – Detailed view of typographic hierarchy, nutritional info layout, and brand identity elements.",
        "Lifestyle composition – Product placed in context with complementary props and warm-toned studio lighting.",
      ],
      orientation: "vertical",
    },

    {
      id: 28,
      items: [
        {
          type: "video",
          src: "/assets/product/product_hhpvid.mp4",
        },
      ],
      title: "NIKE HeadPhones AD",
      description:
        "High-end headphones and modern design collection featuring elegant aesthetics with dark green, beige, and geometric elements.",
      orientation: "vertical",
    },
    {
      id: 29,
      items: [
        {
          type: "image",
          src: "/assets/product/product_hhp1.png",
        },
        {
          type: "image",
          src: "/assets/product/product_hhhpp2.png",
        },
      ],
      title: "NIKE HeadPhones",
      description:
        "Still product renders capturing the premium build quality, material textures, and sleek form factor of the headphone concept.",
      itemDescriptions: [
        "Front-facing hero shot – Clean studio lighting highlighting the matte finish and cushion detailing.",
        "Alternate angle – Side profile emphasizing the adjustable headband curve and ear cup depth.",
      ],
      orientation: "vertical",
    },
    {
      id: 30,
      items: [
        {
          type: "image",
          src: "/assets/product/product_phone1.png",
        },
        {
          type: "image",
          src: "/assets/product/product_phone2.png",
        },
      ],
      title: "MOCHA PHONE 107",
      description: "Yellow smartphone product photography collection with clean angles and creative styling.",
      itemDescriptions: [
        "Straight-on product shot – Bold yellow against neutral backdrop, showcasing the minimal bezel and display.",
        "Angled composition – Dynamic perspective with soft shadow play emphasizing the device's slim profile.",
      ],
      orientation: "vertical",
    },

  ],
  Prompt: [
    {
      id: 32,
      items: [
        {
          type: "video",
          src: "/assets/prompt/prompt_book.mp4",
        },
      ],
      title: "Book",
      description: "",
      orientation: "vertical",
    },
    {
      id: 33,
      items: [
        {
          type: "video",
          src: "/assets/prompt/prompt_sword.mp4",
        },
      ],
      title: "Sword",
      description: "",
      orientation: "vertical",
    },
    {
      id: 34,
      items: [
        {
          type: "video",
          src: "/assets/prompt/prompt_coin.mp4",
        },
      ],
      title: "Coin",
      description: "",
      orientation: "vertical",
    },

    {
      id: 35,
      items: [
        {
          type: "video",
          src: "/assets/prompt/prompt_hamburger.mp4",
        },
      ],
      title: "Hamburger",
      description: "",
      orientation: "vertical",
    },
    {
      id: 36,
      items: [
        {
          type: "video",
          src: "/assets/prompt/prompt_kutu.mp4",
        },
      ],
      title: "Box",
      description: "",
      orientation: "vertical",
    },
    {
      id: 37,
      items: [
        {
          type: "video",
          src: "/assets/prompt/prompt_bloody.mp4",
        },
      ],
      title: "Bloody",
      description: "",
      orientation: "vertical",
    },

    {
      id: 38,
      items: [
        {
          type: "image",
          src: "/assets/prompt/prompt_minimidikeyboard2.jpg",
        },
        {
          type: "image",
          src: "/assets/prompt/prompt_minimidikeyboard1.jpg",
        },
        {
          type: "image",
          src: "/assets/prompt/prompt_minimidikeyboard3.jpg",
          orientation: "horizontal",
        },
      ],
      title: "MIDI Keyboard",
      description: "",
      itemDescriptions: [
        "Top-down perspective – Clean layout showcasing the compact key arrangement and knob controls.",
        "Three-quarter angle – Highlighting the slim profile and tactile button design.",
        "Wide shot setup – MIDI keyboard in a studio context with cables and creative workspace.",
      ],
      orientation: "vertical",
    },
    {
      id: 39,
      items: [
        {
          type: "image",
          src: "/assets/prompt/prompt_sunsworda.png",
        },
        {
          type: "image",
          src: "/assets/prompt/prompt_sunsworda2.png",
        },
        {
          type: "image",
          src: "/assets/prompt/prompt_sunsworda2solid.png",
        },
      ],
      title: "Sunsword",
      description: "",
      itemDescriptions: [
        "Final render – Radiant golden blade with glowing solar engravings against dark backdrop.",
        "Detailed close-up – Hilt ornamentation and gemstone inlay with warm light emission.",
        "Solid color study – Flat shading pass revealing the form language and silhouette clarity.",
      ],
      orientation: "vertical",
    },
    {
      id: 40,
      items: [
        {
          type: "image",
          src: "/assets/prompt/prompt_sword12.png",
        },
        {
          type: "image",
          src: "/assets/prompt/prompt_sword1wire.png",
        },
        {
          type: "image",
          src: "/assets/prompt/prompt_sword1.png",
        },
      ],
      title: "Sword",
      description: "",
      itemDescriptions: [
        "Beauty render – Full blade reveal with dramatic rim lighting and atmospheric fog.",
        "Wireframe overlay – Topology breakdown showing edge flow and polygon distribution.",
        "Material study – Raw metal shader with scratches, wear, and reflective surface detail.",
      ],
      orientation: "vertical",
    },
  ],
  "The Bulb": [
    {
      id: 44,
      items: [{
        type: "image",
        src: "/assets/TheBulb/kapak.png",
      }],
      title: "Cover Art",
      description: "Final cover artwork – A single bulb illuminating the darkness, capturing the core theme of hope and fragility.",
      orientation: "horizontal",
    },
    {
      id: 41,
      items: [{
        type: "image",
        src: "/assets/TheBulb/TheBulb_1.png",
      }],
      title: "Concept Variant A",
      description: "First cover concept iteration – Exploring warm color palettes and typographic placement against the bulb motif.",
      orientation: "horizontal",
    },
    {
      id: 42,
      items: [{
        type: "image",
        src: "/assets/TheBulb/TheBulb_2.png",
      }],
      title: "Concept Variant B",
      description: "Second cover concept – Contrasting cold tones with softer glow, testing visual hierarchy and mood shifts.",
      orientation: "horizontal",
    },
    {
      id: 43,
      items: [{
        type: "image",
        src: "/assets/TheBulb/TheBulb_board.png",
      }],
      title: "Mood Board",
      description: "Visual research and mood board – Reference imagery, texture studies, and color direction for the final design.",
      orientation: "horizontal",
    },
  ],
}

function VideoPlayer({ src, title, onMouseEnter }: { src: string; title: string; onMouseEnter?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const isCarWeirdos = src.includes("carweirdoshoodie2")

  return (
    <video
      ref={videoRef}
      src={src}
      className={`w-full h-full object-cover cursor-pointer ${isCarWeirdos ? "object-[center_75%]" : ""}`}
      autoPlay
      loop
      muted
      playsInline
      onClick={handleVideoClick}
      onMouseEnter={onMouseEnter}
      aria-label={`${title} - Click to ${isPlaying ? "pause" : "play"}`}
    />
  )
}

function HoverOverlay({ project, item, itemIndex, onClose }: {
  project: any;
  item: { type: string; src: string };
  itemIndex?: number;
  onClose: () => void;
}) {
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const DEADZONE = 60

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const isOutside =
      e.clientX < rect.left - DEADZONE ||
      e.clientX > rect.right + DEADZONE ||
      e.clientY < rect.top - DEADZONE ||
      e.clientY > rect.bottom + DEADZONE
    if (isOutside) {
      onClose()
    }
  }, [onClose])

  const desc = itemIndex !== undefined
    ? (project.itemDescriptions?.[itemIndex] || project.description)
    : project.description

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
      onMouseMove={handleMouseMove}
      onClick={onClose}
    >
      <div className="relative w-[90vw] h-[85vh] flex flex-col items-center justify-center">
        <div ref={imageContainerRef} className="relative max-w-full max-h-[75vh] rounded-lg overflow-hidden shadow-2xl">
          {item.type === "video" ? (
            <VideoPlayer src={item.src} title={project.title} />
          ) : (
            <img
              src={item.src}
              alt={project.title}
              className="max-w-full max-h-[75vh] object-contain"
            />
          )}
        </div>
        <div className="mt-4 text-center max-w-2xl">
          <h3 className="text-lg font-medium text-white mb-1">
            {project.title}{itemIndex !== undefined ? ` ${itemIndex + 1}` : ""}
          </h3>
          {desc && (
            <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}


function HoverProgressRing() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px] rounded-lg">
      <svg width="52" height="52" viewBox="0 0 52 52" className="drop-shadow-lg mb-2">
        <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
        <circle
          cx="26" cy="26" r="22"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="138.23"
          strokeDashoffset="138.23"
          transform="rotate(-90 26 26)"
          className="hover-ring-fill"
        />
      </svg>
      <span className="text-[11px] font-medium text-white/80 tracking-wide uppercase">Hold to fullscreen</span>
    </div>
  )
}

function TiledPreview({ items, onItemHover }: { items: Array<{ type: string; src: string }>; onItemHover?: (item: { type: string; src: string }, index: number) => void }) {
  if (items.length === 1) {
    const item = items[0]
    if (item?.type === "video") {
      return <VideoPlayer src={item.src} title="Preview" onMouseEnter={() => onItemHover?.(item, 0)} />
    }
    return <img src={item?.src || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" onMouseEnter={() => onItemHover?.(item!, 0)} />
  }

  if (items.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
        {items.map((item, idx) =>
          item.type === "video" ? (
            <div key={idx} className="w-full h-full">
              <VideoPlayer src={item.src} title={`Preview ${idx + 1}`} onMouseEnter={() => onItemHover?.(item, idx)} />
            </div>
          ) : (
            <img
              key={idx}
              src={item.src || "/placeholder.svg"}
              alt={`Preview ${idx + 1}`}
              className="w-full h-full object-cover"
              onMouseEnter={() => onItemHover?.(item, idx)}
            />
          ),
        )}
      </div>
    )
  }

  if (items.length === 3) {
    return (
      <div className="grid grid-rows-2 gap-0.5 w-full h-full">
        <div className="grid grid-cols-2 gap-0.5">
          {items.slice(0, 2).map((item, idx) =>
            item.type === "video" ? (
              <div key={idx} className="w-full h-full">
                <VideoPlayer src={item.src} title={`Preview ${idx + 1}`} onMouseEnter={() => onItemHover?.(item, idx)} />
              </div>
            ) : (
              <img
                key={idx}
                src={item.src || "/placeholder.svg"}
                alt={`Preview ${idx + 1}`}
                className="w-full h-full object-cover"
                onMouseEnter={() => onItemHover?.(item, idx)}
              />
            ),
          )}
        </div>
        {items[2]?.type === "video" ? (
          <div className="w-full h-full">
            <VideoPlayer src={items[2].src} title="Preview 3" onMouseEnter={() => onItemHover?.(items[2]!, 2)} />
          </div>
        ) : (
          <img src={items[2]?.src || "/placeholder.svg"} alt="Preview 3" className="w-full h-full object-cover" onMouseEnter={() => onItemHover?.(items[2]!, 2)} />
        )}
      </div>
    )
  }

  // 4 or more items: 2x2 grid
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0.5 w-full h-full">
      {items.slice(0, 4).map((item, idx) => {
        return item.type === "video" ? (
          <div key={idx} className="w-full h-full">
            <VideoPlayer src={item.src} title={`Preview ${idx + 1}`} onMouseEnter={() => onItemHover?.(item, idx)} />
          </div>
        ) : (
          <img
            key={idx}
            src={item.src || "/placeholder.svg"}
            alt={`Preview ${idx + 1}`}
            className="w-full h-full object-cover"
            onMouseEnter={() => onItemHover?.(item, idx)} />
        )
      },
      )}
    </div>
  )
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("Home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [gridColumns, setGridColumns] = useState(2)
  const [hoveredProject, setHoveredProject] = useState<{ project: any; item: { type: string; src: string }; itemIndex?: number } | null>(null)
  const [preHoverProjectId, setPreHoverProjectId] = useState<string | null>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const startHover = useCallback((projectId: string, project: any, item: { type: string; src: string }, itemIndex?: number) => {
    cancelHover()
    setPreHoverProjectId(projectId)
    hoverTimerRef.current = setTimeout(() => {
      setHoveredProject({ project, item, itemIndex })
      setPreHoverProjectId(null)
    }, 750)
  }, [])

  const cancelHover = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    setPreHoverProjectId(null)
  }, [])

  const allProjects = projects[selectedCategory as keyof typeof projects] || []

  const allProjectsList = Object.values(projects).flat()
  const slideshowProjects = allProjectsList.filter((p: any) => SLIDESHOW_PROJECT_IDS.includes(p.id))

  useEffect(() => {
    if (isPaused || slideshowProjects.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideshowProjects.length)
    }, SLIDESHOW_INTERVAL)
    return () => clearInterval(interval)
  }, [slideshowProjects.length, isPaused])

  const handleProjectClick = (projectId: number, hasMultipleItems: boolean) => {
    if (hasMultipleItems) {
      setExpandedProjectId(expandedProjectId === projectId ? null : projectId)
    }
  }

  const getVisibleSlideshowProjects = () => {
    const visibleProjects = []
    for (let i = 0; i < 3; i++) {
      const index = (currentSlideIndex + i) % slideshowProjects.length
      visibleProjects.push(slideshowProjects[index])
    }
    return visibleProjects
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 h-8 w-8"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Mobile Menu Toggle */}
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="relative p-2">
            <div
              className={`absolute inset-0 rounded-lg p-[2px] ${isDarkMode
                //? "bg-gradient-to-r from-black via-gray-400 to-white"
                //: "bg-gradient-to-r from-white via-gray-400 to-black"
                }`}
            >
              <div className="w-full h-full bg-background rounded-lg" />
            </div>
            <div className="relative">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </div>
          </button>
        </div>

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside
            className={`
              fixed lg:static inset-y-0 left-0 z-40
              w-64 p-8 flex flex-col
              transition-transform duration-300 lg:translate-x-0
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
              bg-background
            `}
            style={{
              borderRight: isDarkMode ? "1px solid #000000" : "1px solid oklch(0.922 0 0)",
            }}
          >
            {/* Profile */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
                  <img
                    src="/assets/logo_pp_v2.png"
                    alt="Şafak Düvenci"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory("Home")
                    setIsMobileMenuOpen(false)
                    setExpandedProjectId(null)
                  }}
                  className="relative group"
                  aria-label="Home"
                >
                  {selectedCategory === "Home" && (
                    <div
                      className={`absolute inset-0 rounded-lg p-[2px] ${isDarkMode
                        //? "bg-gradient-to-r from-black via-gray-400 to-white"
                        //: "bg-gradient-to-r from-white via-gray-400 to-black"
                        }`}
                    >
                      <div className="w-full h-full bg-background rounded-lg" />
                    </div>
                  )}
                  <div
                    className={`relative p-3 rounded-lg transition-colors flex items-center gap-2 ${selectedCategory === "Home" ? "" : "hover:bg-accent/30"
                      }`}
                  >
                    <Home className="h-6 w-6" />
                    <span className="text-sm font-medium">Home</span>
                  </div>
                </button>
              </div>

              {/* Category Menu */}
              <nav className="space-y-2">
                {categories
                  .filter((cat) => cat !== "Home")
                  .map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsMobileMenuOpen(false)
                        setExpandedProjectId(null)
                      }}
                      className="relative w-full text-left group"
                    >
                      {selectedCategory === category && (
                        <div
                          className={`absolute inset-0 rounded-lg p-[3px] ${isDarkMode
                            //</button>? "bg-gradient-to-r from-black via-gray-400 to-white"
                            //: "bg-gradient-to-r from-white via-gray-400 to-black"
                            }`}
                        >
                          <div className="w-full h-full bg-background rounded-lg" />
                        </div>
                      )}
                      <motion.div
                        animate={{
                          x: selectedCategory === category ? 8 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${selectedCategory === category ? "" : "hover:bg-accent/30"
                          }`}
                      >
                        <span className={`text-sm ${selectedCategory === category ? "font-medium" : ""}`}>
                          {selectedCategory === category ? "◉ " : "○ "}
                        </span>
                        <span className={`text-sm ml-3 ${selectedCategory === category ? "font-medium" : ""}`}>
                          <span className="block">{category}</span>
                          {(category === "The Bulb" || category === "Lightsout") && (
                            <span className="block text-[10px] opacity-50 font-normal -mt-0.5">Animation Film</span>
                          )}
                        </span>
                      </motion.div>
                    </button>
                  ))}
              </nav>
            </div>

            {/* Social Icons */}
            <div className="mt-auto">
              <div
                className={`relative rounded-lg p-[2px] ${isDarkMode
                  //? "bg-gradient-to-b from-white via-gray-500 to-black"
                  //: "bg-gradient-to-b from-black via-gray-500 to-white"
                  }`}
              >
                <div className="bg-background rounded-lg p-3">
                  <div className="flex justify-around items-center gap-2">
                    <a
                      href="https://www.linkedin.com/in/mustafasafakduvenci/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:mustafaduvenci@icloud.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      aria-label="mail"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.artstation.com/safuk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      aria-label="ArtStation"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 6.728 2.565 14.286h10.306z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/sfffak/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          )}

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-12">
            {/* Header */}
            <div className="flex justify-center mb-8 lg:mb-12">
              <img
                src="/assets/TEXT.png"
                alt="MUSTAFA ŞAFAK DÜVENCİ"
                className={`h-8 lg:h-12 object-contain ${isDarkMode ? "invert" : ""}`}
              />
            </div>

            {selectedCategory === "Home" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-center items-center"
              >
                <div className="w-full max-w-5xl aspect-video rounded-lg overflow-hidden border border-border shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/jrJtd-Izb8M?autoplay=1&loop=1&playlist=jrJtd-Izb8M&mute=1&controls=1"
                    title="Portfolio Showreel"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h2 className="text-xl lg:text-2xl font-medium mt-6 text-center">2024 Blender ShowReel</h2>



                {slideshowProjects.length > 0 && (
                  <div
                    className="mt-12 w-full max-w-6xl"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Mobile: Show single project with animation */}
                    <div className="lg:hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlideIndex}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5 }}
                          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
                        >
                          {/* Mobile: Show single project */}
                          <div className="lg:hidden">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-4 border border-border">
                              {slideshowProjects[currentSlideIndex].items[0].type === "video" ? (
                                <VideoPlayer
                                  src={slideshowProjects[currentSlideIndex].items[0].src}
                                  title={slideshowProjects[currentSlideIndex].title}
                                />
                              ) : (
                                <img
                                  src={slideshowProjects[currentSlideIndex].items[0].src || "/placeholder.svg"}
                                  alt={slideshowProjects[currentSlideIndex].title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <h3 className="text-base lg:text-lg font-medium mb-2 text-center">
                              {slideshowProjects[currentSlideIndex].title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed text-center">
                              {slideshowProjects[currentSlideIndex].description}
                            </p>
                          </div>

                          {/* Desktop: Show 3 projects */}
                          {getVisibleSlideshowProjects().map((project, idx) => (
                            <div key={`${currentSlideIndex}-${idx}`} className="hidden lg:block">
                              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-4 border border-border">
                                {project.items[0].type === "video" ? (
                                  <VideoPlayer src={project.items[0].src} title={project.title} />
                                ) : (
                                  <img
                                    src={project.items[0].src || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <h3 className="text-base lg:text-lg font-medium mb-2 text-center">{project.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                                {project.description}
                              </p>
                            </div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Desktop: Show 3 projects simultaneously */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                      {getVisibleSlideshowProjects().map((project, idx) => (
                        <motion.div
                          key={`${currentSlideIndex}-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="group"
                        >
                          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-4 border border-border">
                            {project.items[0].type === "video" ? (
                              <VideoPlayer src={project.items[0].src} title={project.title} />
                            ) : (
                              <img
                                src={project.items[0].src || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <h3 className="text-base lg:text-lg font-medium mb-2 text-center">{project.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed text-center">
                            {project.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                <br /><br />
                <h4 className="text-xl lg:text-1xl font-medium mt-6 text-center">Biography</h4>
                <br /><br />
                <h6 className="text-center leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                  23 years old | Graduate of Üsküdar University, Cartoon and Animation<br /><br />
                  Skilled in <strong>3D</strong> and <strong>2D art</strong>, with experience as a drone operator, cameraman, and graphic designer.<br /><br />
                  Member of the <strong>"ineq"</strong> team, where I contribute as a <strong>3D artist</strong>, <strong>level designer</strong>, and <strong>SFX artist</strong> in game development projects.<br /><br />
                  Always eager to learn and explore new techniques and technologies in art, animation, and game development.
                </h6>
              </motion.div>

            ) : selectedCategory === "Lightsout" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <div className="w-full max-w-5xl mx-auto aspect-video rounded-lg overflow-hidden border border-border shadow-lg mb-8">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/qSPAXMhdoBk?autoplay=1&loop=1&playlist=qSPAXMhdoBk&mute=1&controls=1"
                    title="Lightsout"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h2 className="text-xl lg:text-2xl font-medium mb-8 text-center">Lightsout - Animated Short Film</h2>

                {/* Grid Toggle - Desktop Only */}
                <div className="hidden lg:flex justify-end mb-4 gap-2">
                  <Button
                    variant={gridColumns === 2 ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridColumns(2)}
                    aria-label="2 columns grid"
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridColumns === 4 ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridColumns(4)}
                    aria-label="4 columns grid"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                {/* Projects Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns === 2 ? "lg:grid-cols-2 xl:grid-cols-2" : "lg:grid-cols-3 xl:grid-cols-4"
                  } gap-6 lg:gap-8`}>
                  {allProjects.map((project: any, index) => {
                    const hasMultipleItems = project.items.length > 1
                    const isExpanded = expandedProjectId === project.id
                    const aspectRatio = project.orientation === "horizontal" ? "aspect-[16/9]" : "aspect-[3/4]"

                    if (hasMultipleItems && isExpanded) {
                      return project.items.map((item: any, itemIndex: number) => (
                        <motion.div
                          key={`${project.id}-${itemIndex}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                          className="group"
                        >
                          <div
                            className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border cursor-pointer ${preHoverProjectId === `${project.id}-${itemIndex}` ? "pre-hover-active" : ""}`}
                            onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                            onMouseEnter={() => startHover(`${project.id}-${itemIndex}`, project, item, itemIndex)}
                            onMouseLeave={cancelHover}
                          >
                            {preHoverProjectId === `${project.id}-${itemIndex}` && <HoverProgressRing />}
                            {item.type === "video" ? (
                              <VideoPlayer src={item.src} title={`${project.title} ${itemIndex + 1}`} />
                            ) : (
                              <img
                                src={item.src || "/placeholder.svg"}
                                alt={`${project.title} ${itemIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <h3 className="text-base lg:text-lg font-medium mb-2">
                            {project.title} {itemIndex + 1}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.itemDescriptions?.[itemIndex] || project.description}</p>
                        </motion.div>
                      ))
                    }

                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <div
                          className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border ${hasMultipleItems ? "cursor-pointer" : ""} ${!hasMultipleItems && preHoverProjectId === `${project.id}` ? "pre-hover-active" : ""}
                            `}
                          onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                          onMouseEnter={!hasMultipleItems ? () => startHover(`${project.id}`, project, project.items[0]) : undefined}
                          onMouseLeave={!hasMultipleItems ? cancelHover : undefined}
                        >
                          <TiledPreview items={project.items} />
                          {!hasMultipleItems && preHoverProjectId === `${project.id}` && <HoverProgressRing />}
                        </div>
                        <h3 className="text-base lg:text-lg font-medium mb-2">
                          {project.title}
                          {hasMultipleItems && (
                            <span className="text-xs ml-2 text-muted-foreground">({project.items.length})</span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ) : selectedCategory === "The Bulb" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <div className="w-full max-w-5xl mx-auto aspect-video rounded-lg overflow-hidden border border-border shadow-lg mb-8">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/MqhSaht1EpQ?autoplay=1&loop=1&playlist=MqhSaht1EpQ&mute=1&controls=1"
                    title="The Bulb"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h2 className="text-xl lg:text-2xl font-medium mb-8 text-center">The Bulb - Animated Short Film</h2>

                {/* Grid Toggle - Desktop Only */}
                <div className="hidden lg:flex justify-end mb-4 gap-2">
                  <Button
                    variant={gridColumns === 2 ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridColumns(2)}
                    aria-label="2 columns grid"
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridColumns === 4 ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridColumns(4)}
                    aria-label="4 columns grid"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                {/* Projects Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns === 2 ? "lg:grid-cols-2 xl:grid-cols-2" : "lg:grid-cols-3 xl:grid-cols-4"
                  } gap-6 lg:gap-8`}>
                  {allProjects.map((project: any, index) => {
                    const hasMultipleItems = project.items.length > 1
                    const isExpanded = expandedProjectId === project.id
                    const aspectRatio = project.orientation === "horizontal" ? "aspect-[16/9]" : "aspect-[3/4]"

                    if (hasMultipleItems && isExpanded) {
                      return project.items.map((item: any, itemIndex: number) => (
                        <motion.div
                          key={`${project.id}-${itemIndex}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                          className="group"
                        >
                          <div
                            className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border cursor-pointer ${preHoverProjectId === `${project.id}-${itemIndex}` ? "pre-hover-active" : ""}`}
                            onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                            onMouseEnter={() => startHover(`${project.id}-${itemIndex}`, project, item, itemIndex)}
                            onMouseLeave={cancelHover}
                          >
                            {preHoverProjectId === `${project.id}-${itemIndex}` && <HoverProgressRing />}
                            {item.type === "video" ? (
                              <VideoPlayer src={item.src} title={`${project.title} ${itemIndex + 1}`} />
                            ) : (
                              <img
                                src={item.src || "/placeholder.svg"}
                                alt={`${project.title} ${itemIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <h3 className="text-base lg:text-lg font-medium mb-2">
                            {project.title} {itemIndex + 1}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.itemDescriptions?.[itemIndex] || project.description}</p>
                        </motion.div>
                      ))
                    }

                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <div
                          className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border ${hasMultipleItems ? "cursor-pointer" : ""} ${!hasMultipleItems && preHoverProjectId === `${project.id}` ? "pre-hover-active" : ""}
                            `}
                          onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                          onMouseEnter={!hasMultipleItems ? () => startHover(`${project.id}`, project, project.items[0]) : undefined}
                          onMouseLeave={!hasMultipleItems ? cancelHover : undefined}
                        >
                          <TiledPreview items={project.items} />
                          {!hasMultipleItems && preHoverProjectId === `${project.id}` && <HoverProgressRing />}
                        </div>
                        <h3 className="text-base lg:text-lg font-medium mb-2">
                          {project.title}
                          {hasMultipleItems && (
                            <span className="text-xs ml-2 text-muted-foreground">({project.items.length})</span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                      </motion.div>
                    )
                  })}
                </div>

              </motion.div>
            ) : selectedCategory === "Game Design" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <div className="w-full max-w-5xl mx-auto aspect-video rounded-lg overflow-hidden border border-border shadow-lg mb-8">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/LvicjJbgAQU?autoplay=1&loop=1&playlist=LvicjJbgAQU&mute=1&controls=1"
                    title="Game Design"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h2 className="text-xl lg:text-2xl font-medium mb-8 text-center">Game Design</h2>

                {/* Grid Toggle - Desktop Only */}
                <div className="hidden lg:flex justify-end mb-4 gap-2">
                  <Button
                    variant={gridColumns === 2 ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridColumns(2)}
                    aria-label="2 columns grid"
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridColumns === 4 ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setGridColumns(4)}
                    aria-label="4 columns grid"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                {/* Projects Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns === 2 ? "lg:grid-cols-2 xl:grid-cols-2" : "lg:grid-cols-3 xl:grid-cols-4"
                  } gap-6 lg:gap-8`}>
                  {allProjects.map((project: any, index) => {
                    const hasMultipleItems = project.items.length > 1
                    const isExpanded = expandedProjectId === project.id
                    const aspectRatio = project.orientation === "horizontal" ? "aspect-[16/9]" : "aspect-[3/4]"

                    if (hasMultipleItems && isExpanded) {
                      return project.items.map((item: any, itemIndex: number) => (
                        <motion.div
                          key={`${project.id}-${itemIndex}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                          className="group"
                        >
                          <div
                            className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border cursor-pointer ${preHoverProjectId === `${project.id}-${itemIndex}` ? "pre-hover-active" : ""}`}
                            onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                            onMouseEnter={() => startHover(`${project.id}-${itemIndex}`, project, item, itemIndex)}
                            onMouseLeave={cancelHover}
                          >
                            {preHoverProjectId === `${project.id}-${itemIndex}` && <HoverProgressRing />}
                            {item.type === "video" ? (
                              <VideoPlayer src={item.src} title={`${project.title} ${itemIndex + 1}`} />
                            ) : (
                              <img
                                src={item.src || "/placeholder.svg"}
                                alt={`${project.title} ${itemIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <h3 className="text-base lg:text-lg font-medium mb-2">
                            {project.title} {itemIndex + 1}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.itemDescriptions?.[itemIndex] || project.description}</p>
                        </motion.div>
                      ))
                    }

                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <div
                          className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border ${hasMultipleItems ? "cursor-pointer" : ""} ${!hasMultipleItems && preHoverProjectId === `${project.id}` ? "pre-hover-active" : ""}
                            `}
                          onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                          onMouseEnter={!hasMultipleItems ? () => startHover(`${project.id}`, project, project.items[0]) : undefined}
                          onMouseLeave={!hasMultipleItems ? cancelHover : undefined}
                        >
                          <TiledPreview items={project.items} />
                          {!hasMultipleItems && preHoverProjectId === `${project.id}` && <HoverProgressRing />}
                        </div>
                        <h3 className="text-base lg:text-lg font-medium mb-2">
                          {project.title}
                          {hasMultipleItems && (
                            <span className="text-xs ml-2 text-muted-foreground">({project.items.length})</span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Grid Toggle - Desktop Only */}
                  <div className="hidden lg:flex justify-end mb-4 gap-2">
                    <Button
                      variant={gridColumns === 2 ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGridColumns(2)}
                      aria-label="2 columns grid"
                    >
                      <Grid2x2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={gridColumns === 4 ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGridColumns(4)}
                      aria-label="4 columns grid"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns === 2 ? "lg:grid-cols-2 xl:grid-cols-2" : "lg:grid-cols-3 xl:grid-cols-4"
                    } gap-6 lg:gap-8`}
                  >
                    {allProjects.map((project: any, index) => {
                      const hasMultipleItems = project.items.length > 1
                      const isExpanded = expandedProjectId === project.id
                      const aspectRatio = project.orientation === "horizontal" ? "aspect-[16/9]" : "aspect-[3/4]"

                      if (hasMultipleItems && isExpanded) {
                        return project.items.map((item: any, itemIndex: number) => (
                          <motion.div
                            key={`${project.id}-${itemIndex}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                            className="group"
                          >
                            <div
                              className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border cursor-pointer ${preHoverProjectId === `${project.id}-${itemIndex}` ? "pre-hover-active" : ""}`}
                              onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                              onMouseEnter={() => startHover(`${project.id}-${itemIndex}`, project, item, itemIndex)}
                              onMouseLeave={cancelHover}
                            >
                              {preHoverProjectId === `${project.id}-${itemIndex}` && <HoverProgressRing />}
                              {item.type === "video" ? (
                                <VideoPlayer src={item.src} title={`${project.title} ${itemIndex + 1}`} />
                              ) : (
                                <img
                                  src={item.src || "/placeholder.svg"}
                                  alt={`${project.title} ${itemIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <h3 className="text-base lg:text-lg font-medium mb-2">
                              {project.title} {itemIndex + 1}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{project.itemDescriptions?.[itemIndex] || project.description}</p>
                          </motion.div>
                        ))
                      }

                      return (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="group"
                        >
                          <div
                            className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-muted mb-4 border border-border ${hasMultipleItems ? "cursor-pointer" : ""} ${!hasMultipleItems && preHoverProjectId === `${project.id}` ? "pre-hover-active" : ""}
                              `}
                            onClick={() => handleProjectClick(project.id, hasMultipleItems)}
                            onMouseEnter={!hasMultipleItems ? () => startHover(`${project.id}`, project, project.items[0]) : undefined}
                            onMouseLeave={!hasMultipleItems ? cancelHover : undefined}
                          >
                            <TiledPreview items={project.items} />
                            {!hasMultipleItems && preHoverProjectId === `${project.id}` && <HoverProgressRing />}
                          </div>
                          <h3 className="text-base lg:text-lg font-medium mb-2">
                            {project.title}
                            {hasMultipleItems && (
                              <span className="text-xs ml-2 text-muted-foreground">({project.items.length})</span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Hover Zoom Overlay */}
            <AnimatePresence>
              {hoveredProject && selectedCategory !== "Home" && (
                <HoverOverlay
                  project={hoveredProject.project}
                  item={hoveredProject.item}
                  itemIndex={hoveredProject.itemIndex}
                  onClose={() => setHoveredProject(null)}
                />
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
