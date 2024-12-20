/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from "framer-motion";
import './SingleCard.css';

const SingleCard = ({card, handleChoice}) => {

  const handleClick = () => {
    handleChoice(card);
  }

  return (
    <motion.div
    className="card"
    key={card.id}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <div>
      <img className="front" src={card.src} alt="card front" />
      <img className="back" src="/img/cover.png" onClick={handleClick} alt="card back" />
    </div>
  </motion.div>
  )
}

export default SingleCard