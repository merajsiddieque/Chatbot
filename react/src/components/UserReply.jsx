/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

export default function UserReply({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-lg w-full mb-4 p-4 rounded-2xl bg-sky-100 text-sky-800 leading-relaxed shadow-sm font-sans text-[15px] self-end"
    >
      <p className="whitespace-pre-wrap">{message}</p>
    </motion.div>
  );
}
