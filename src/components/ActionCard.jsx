// src/components/ActionCard.jsx
import React from 'react';
import './ActionCard.css';
import { Link } from 'react-router-dom';

function ActionCard({ icon, title, description, buttonLabel, color, to }) {
  return (
    <div className="action-card">
      <div className={`icon-circle ${color}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={to}>
        <button className={`card-button ${color}`}>{buttonLabel}</button>
      </Link>
    </div>
  );
}

export default ActionCard;
