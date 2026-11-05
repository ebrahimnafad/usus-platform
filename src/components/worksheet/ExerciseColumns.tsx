import type { ReactElement, ReactNode } from "react";
import {
  COLUMN_GAP_PX,
  COLUMN_WIDTHS_PX,
  type ExerciseColumnCount,
} from "@/components/worksheet/layout-standard";

const COLUMN_NAMES: Record<ExerciseColumnCount, string> = {
  1: "one",
  2: "two",
  3: "three",
};

export interface ExerciseColumnsProps {
  columns: ExerciseColumnCount;
  children: ReactNode;
  className?: string;
}

/**
 * The only way an archetype lays content side by side inside an exercise:
 * fixed-width columns from the layout standard, so content never decides
 * its own width by wrapping.
 */
export function ExerciseColumns({
  columns,
  children,
  className = "",
}: ExerciseColumnsProps): ReactElement {
  return (
    <div
      data-exercise-columns={COLUMN_NAMES[columns]}
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, ${COLUMN_WIDTHS_PX[columns]}px)`,
        columnGap: COLUMN_GAP_PX,
        rowGap: COLUMN_GAP_PX,
      }}
    >
      {children}
    </div>
  );
}
