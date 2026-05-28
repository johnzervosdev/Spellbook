import type { SpellSlotState } from "../../types";
import { ALL_SLOT_LEVELS, remainingSlots } from "../../features/slots/slotUtils";
import { Button } from "../common/Button";

interface Props {
  slots: SpellSlotState;
  onLongRest: () => void;
  /** Wide panel (default) vs narrow strip beside character stats */
  layout?: "panel" | "sidebar";
}

export const SpellSlotTracker = ({ slots, onLongRest, layout = "panel" }: Props) => {
  const levelsInUse = ALL_SLOT_LEVELS.filter((level) => slots[level].total > 0);

  return (
    <div className={`slot-tracker slot-tracker--${layout}`}>
      {layout === "sidebar" ? (
        <h2 className="slot-tracker__heading">Slots</h2>
      ) : null}
      <ul className="slot-list">
        {levelsInUse.map((level) => {
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
      <Button
        type="button"
        className="btn--rest"
        onClick={onLongRest}
        title="Restore all spell slots and hit points"
      >
        Long Rest
      </Button>
      </div>
    </div>
  );
};
