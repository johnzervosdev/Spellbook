import type { SpellSlotState } from "../../types";
import { remainingSlots } from "../../features/slots/slotUtils";

interface Props {
  slots: SpellSlotState;
}

const LEVELS: Array<keyof SpellSlotState> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const SpellSlotTracker = ({ slots }: Props) => (
  <ul className="slot-list">
    {LEVELS.map((level) => {
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
);
