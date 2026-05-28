import type { MouseEvent } from "react";
import type { Character } from "../../types";
import { Button } from "../common/Button";

const LARGE_STEP = 5;

interface Props {
  character: Character;
  onAdjust: (delta: number) => void;
}

export const CharacterHitPoints = ({ character, onAdjust }: Props) => {
  const adjustFromClick = (e: MouseEvent<HTMLButtonElement>, sign: -1 | 1) => {
    const step = e.shiftKey ? LARGE_STEP : 1;
    onAdjust(sign * step);
  };

  return (
    <div className="hp-tracker">
      <span className="hp-tracker__label">HP</span>
      <span className="hp-tracker__value" aria-live="polite">
        <span className="hp-tracker__current">{character.currentHp}</span>
        <span className="hp-tracker__sep">/</span>
        <span className="hp-tracker__max">{character.maxHp}</span>
      </span>
      <div className="hp-tracker__controls">
        <Button
          type="button"
          className="hp-btn"
          title={`Lose 1 HP (Shift+click: lose ${LARGE_STEP})`}
          aria-label={`Lose 1 hit point. Shift+click to lose ${LARGE_STEP}.`}
          onClick={(e) => adjustFromClick(e, -1)}
        >
          −
        </Button>
        <Button
          type="button"
          className="hp-btn"
          title={`Gain 1 HP (Shift+click: gain ${LARGE_STEP})`}
          aria-label={`Gain 1 hit point. Shift+click to gain ${LARGE_STEP}.`}
          onClick={(e) => adjustFromClick(e, 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
