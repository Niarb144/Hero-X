"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  onFinish: () => void;
};

export default function IntroLoader({ onFinish }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0.6 }}
        animate={{ scale: 10 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1], // smooth "reveal" curve
        }}
        onAnimationComplete={onFinish}
        className="w-20 h-20"
      >
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={80}
          height={80}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
