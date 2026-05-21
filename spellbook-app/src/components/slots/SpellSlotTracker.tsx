import type { SpellSlotState } from "../../types";
import { ALL_SLOT_LEVELS, remainingSlots } from "../../features/slots/slotUtils";
import { Button } from "../common/Button";

interface Props {
  slots: SpellSlotState;
  onLongRest: () => void;
}

export const SpellSlotTracker = ({ slots, onLongRest }: Props) => (
  <div className="slot-tracker">
    <ul className="slot-list">
      {ALL_SLOT_LEVELS.map((level) => {
        const { total } = slots[level];
        const remaining = remainingSlots(slots, level);
        return (
          <li key={level} className="slot-row">
            <span className="slot-level">Lv {level}</span>
            <span className="slot-count">
              {remaining}/{total}
            </span>
            <span className="slot-pips" aria-hidden="true">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`slot-pip${i < remaining ? " slot-pip--full" : " slot-pip--spent"}`}
                />
              ))}
            </span>
          </li>
        );
      })}
    </ul>
    <div className="slot-actions">
      <Button type="button" className="btn--rest" onClick={onLongRest}>
        Long Rest
      </Button>
    </div>
  </div>
);
