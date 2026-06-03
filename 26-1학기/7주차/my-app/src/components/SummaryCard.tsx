import type { KeyboardEvent } from 'react';
import type { SummaryCardProps } from '../types/lion';
import { cardImageUrl, getCardTag, partDisplay } from '../utils/lions';

function SummaryCard({ lion, onClick }: SummaryCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className="summary-card"
      tabIndex={0}
      role="link"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className="summary-card-media">
        <img src={cardImageUrl(lion)} alt="" />
        <span className="summary-card-tag">{getCardTag(lion)}</span>
      </div>
      <div className="summary-card-body">
        <h3 className="summary-card-name">{lion.name}</h3>
        <p className="summary-card-part">{partDisplay(lion.part)}</p>
        <p className="summary-card-intro">{lion.intro || '자기소개가 없습니다.'}</p>
      </div>
    </article>
  );
}

export default SummaryCard;
