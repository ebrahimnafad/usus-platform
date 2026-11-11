import React from "react";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import type { JoinPartsData } from "@/archetypes/join-parts";
import type { TakeAwayData } from "@/archetypes/take-away";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { VisualModelView } from "@/visual-models/registry";
import { PartsTableView } from "@/components/worksheet/PartsTableView";

export interface PartWholeCardGridProps {
  data: JoinPartsData | TakeAwayData;
  mode: "worksheet" | "answer-key";
}

function renderItemHeaderAndModel(params: {
  idx: number;
  columns: 1 | 2;
  stackHeader: boolean;
  isAnswerKey: boolean;
  solvedBadgeAr: string;
  worksheetSummaryAr: string;
  representationModel?: JoinPartsData["items"][number]["representationModel"];
  companionDigitModel?: JoinPartsData["items"][number]["companionDigitModel"];
  operatorSign: "+" | "−";
  flexFill: boolean;
}): React.ReactElement {
  const {
    idx,
    columns,
    stackHeader,
    isAnswerKey,
    solvedBadgeAr,
    worksheetSummaryAr,
    representationModel,
    companionDigitModel,
    operatorSign,
    flexFill,
  } = params;

  if (stackHeader) {
    return (
      <div
        className={`flex w-full ${
          flexFill ? "flex-1 items-center justify-center gap-0.5" : "gap-1"
        } flex-col`}
      >
        <div className="flex w-full items-center justify-between">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
            {formatEasternNumber(idx + 1)}
          </span>
          {isAnswerKey ? (
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
              {solvedBadgeAr}
            </span>
          ) : (
            <span className="text-[13px] font-extrabold leading-none text-slate-600">
              {worksheetSummaryAr}
            </span>
          )}
        </div>
        <div className="flex w-full items-center justify-center gap-1">
          {representationModel && (
            <VisualModelView model={representationModel} solved={isAnswerKey} />
          )}
          {companionDigitModel && (
            <div className="flex items-center gap-1">
              <span
                className="text-[28px] font-black leading-none text-indigo-700"
                aria-hidden="true"
              >
                {operatorSign}
              </span>
              <VisualModelView
                model={companionDigitModel}
                solved={isAnswerKey}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${flexFill ? "flex-1" : ""} items-center ${
        columns === 1 ? "gap-3" : "w-full justify-between gap-1"
      }`}
    >
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
        {formatEasternNumber(idx + 1)}
      </span>
      <div
        className={`flex ${
          flexFill ? "flex-1 justify-center" : ""
        } items-center gap-1`}
      >
        {representationModel && (
          <VisualModelView model={representationModel} solved={isAnswerKey} />
        )}
        {companionDigitModel && (
          <div className="flex items-center gap-1">
            <span
              className="text-[28px] font-black leading-none text-indigo-700"
              aria-hidden="true"
            >
              {operatorSign}
            </span>
            <VisualModelView model={companionDigitModel} solved={isAnswerKey} />
          </div>
        )}
      </div>
      {isAnswerKey ? (
        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
          {solvedBadgeAr}
        </span>
      ) : (
        <span className="text-[13px] font-extrabold leading-none text-slate-600">
          {worksheetSummaryAr}
        </span>
      )}
    </div>
  );
}

export function PartWholeCardGrid({
  data,
  mode,
}: PartWholeCardGridProps): React.ReactElement {
  const isAnswerKey = mode === "answer-key";
  const columns: 1 | 2 = data.items.length === 1 ? 1 : 2;

  if (data.kind === "TakeAway" && data.graphModel) {
    return (
      <div
        className="space-y-1"
        data-archetype="TakeAway"
        data-response-form={data.responseForm}
        data-action={data.action}
        data-representation="picture-graph"
      >
        {/* The redesigned picture graph (390–430px intrinsic) cannot share a
            324px fixed column, so the graph takes the full-width row and its
            equations stack beneath it. */}
        <ExerciseColumns columns={1}>
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 p-1 shadow-2xs">
            <VisualModelView model={data.graphModel} solved={isAnswerKey} />
          </div>

          <div
            className="flex flex-col justify-between gap-1"
            data-more-or-less-equations="true"
          >
            {data.items.map((item, idx) => {
              const solvedUnknownAr = item.solvedUnknownAr;

              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-between gap-0.5 rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/25 px-1.5 py-1 shadow-2xs"
                  data-take-away-item-id={toEasternArabicNumerals(item.id)}
                  data-fact={toEasternArabicNumerals(item.factKey)}
                >
                  <div className="flex w-full items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                        {formatEasternNumber(idx + 1)}
                      </span>
                      {item.categoryObjectId && (
                        <EverydayObjectSvg
                          objectId={item.categoryObjectId}
                          size="tiny"
                        />
                      )}
                      {item.categoryLabelAr && (
                        <span className="text-[13px] font-extrabold leading-none text-slate-900">
                          {toEasternArabicNumerals(item.categoryLabelAr)}
                        </span>
                      )}
                    </div>
                    {isAnswerKey && (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                        {solvedUnknownAr}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    {item.responseModel && (
                      <VisualModelView
                        model={item.responseModel}
                        solved={isAnswerKey}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ExerciseColumns>
      </div>
    );
  }

  if (data.kind === "JoinParts") {
    return (
      <div
        className="space-y-1"
        data-archetype="JoinParts"
        data-response-form={data.responseForm}
        data-action={data.action}
      >
        <ExerciseColumns columns={columns}>
          {data.items.map((item, idx) => (
            <div
              key={item.id}
              className={`${
                columns === 1
                  ? "flex items-center justify-around gap-3 px-3 py-1"
                  : "flex flex-col items-center justify-between gap-0.5 px-1 py-0.5"
              } rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/25 shadow-2xs`}
              data-join-item-id={toEasternArabicNumerals(item.id)}
              data-fact={toEasternArabicNumerals(item.factKey)}
            >
              {renderItemHeaderAndModel({
                idx,
                columns,
                stackHeader: Boolean(item.companionDigitModel && columns !== 1),
                isAnswerKey,
                solvedBadgeAr: item.totalAr,
                // §8.1: the worksheet header never prints the missing Part's
                // numeral (it would solve the item). Total-unknown items keep
                // the plain two-part summary.
                worksheetSummaryAr:
                  item.unknownPosition === "part2"
                    ? `الكلّ ${item.totalAr} والجزء الأول ${item.part1Ar}`
                    : item.unknownPosition === "part1"
                      ? `الكلّ ${item.totalAr} والجزء الثاني ${item.part2Ar}`
                      : `${item.part1Ar} و${item.part2Ar}`,
                representationModel: item.representationModel,
                companionDigitModel: item.companionDigitModel,
                operatorSign: "+",
                flexFill: false,
              })}

              <div className="flex flex-wrap items-center justify-center gap-1">
                {data.responseForm === "parts-table" ? (
                  <PartsTableView
                    part1={item.part1}
                    part2={item.part2}
                    total={item.total}
                    missingPosition={item.unknownPosition}
                    tracePositions={item.tracePositions}
                    solved={isAnswerKey}
                  />
                ) : (
                  item.responseModel && (
                    <VisualModelView
                      model={item.responseModel}
                      solved={isAnswerKey}
                    />
                  )
                )}
                {item.companionBondModel && (
                  <VisualModelView
                    model={item.companionBondModel}
                    solved={isAnswerKey}
                  />
                )}
              </div>

              {data.showTermLabels && (
                <div
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-50/70 px-2 py-0.5 text-[13px] font-extrabold text-indigo-950"
                  data-term-labels="true"
                >
                  <span className="text-sky-900">
                    الجزء{isAnswerKey ? ` (${item.part1Ar})` : ""}
                  </span>
                  <span className="text-indigo-400">+</span>
                  <span className="text-amber-900">
                    الجزء{isAnswerKey ? ` (${item.part2Ar})` : ""}
                  </span>
                  <span className="text-indigo-400">=</span>
                  <span className="text-indigo-900">
                    الكلّ{isAnswerKey ? ` (${item.totalAr})` : ""}
                  </span>
                </div>
              )}
            </div>
          ))}
        </ExerciseColumns>
      </div>
    );
  }

  return (
    <div
      className="space-y-1"
      data-archetype="TakeAway"
      data-response-form={data.responseForm}
      data-action={data.action}
    >
      <ExerciseColumns columns={columns}>
        {data.items.map((item, idx) => {
          const solvedUnknownAr = item.solvedUnknownAr;

          const worksheetSummaryAr =
            item.unknownKind === "partTakenAway"
              ? `الكلّ ${item.totalAr} وبقي ${item.missingPartAr}`
              : item.unknownKind === "total"
                ? `شُطب ${item.partTakenAwayAr} وبقي ${item.missingPartAr}`
                : `${item.totalAr} − ${item.partTakenAwayAr}`;

          const isWideModelInMultiColumn =
            columns !== 1 &&
            (item.representation === "five-frame" ||
              item.representation === "five-frame-and-digit" ||
              item.representation === "ten-frame" ||
              item.representation === "ten-frame-and-digit");

          return (
            <div
              key={item.id}
              className={`${
                columns === 1
                  ? "flex items-center justify-around gap-3 px-3 py-1"
                  : "flex flex-col items-center justify-between gap-0.5 px-1 py-0.5"
              } rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/25 shadow-2xs`}
              data-take-away-item-id={toEasternArabicNumerals(item.id)}
              data-fact={toEasternArabicNumerals(item.factKey)}
            >
              {renderItemHeaderAndModel({
                idx,
                columns,
                stackHeader: isWideModelInMultiColumn,
                isAnswerKey,
                solvedBadgeAr: solvedUnknownAr,
                worksheetSummaryAr,
                representationModel: item.representationModel,
                companionDigitModel: item.companionDigitModel,
                operatorSign: "−",
                flexFill: true,
              })}

              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {data.responseForm === "answer-slot" ? (
                  <div
                    dir="rtl"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-2.5 py-1 shadow-2xs"
                    data-take-away-slot-box="true"
                  >
                    {data.action === "trace" && (
                      <div className="inline-flex items-center gap-1 border-l border-slate-200 pl-2">
                        <span
                          className={`text-[28px] font-black leading-none ${
                            isAnswerKey ? "text-emerald-700" : "text-slate-400"
                          }`}
                          data-trace-state={isAnswerKey ? "solid" : "dotted"}
                        >
                          {item.totalAr}
                        </span>
                        <span
                          className="text-[28px] font-black leading-none text-indigo-700"
                          aria-hidden="true"
                        >
                          −
                        </span>
                        <span
                          className={`text-[28px] font-black leading-none ${
                            isAnswerKey ? "text-emerald-700" : "text-slate-400"
                          }`}
                          data-trace-state={isAnswerKey ? "solid" : "dotted"}
                        >
                          {item.partTakenAwayAr}
                        </span>
                      </div>
                    )}
                    <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                      كم بقي؟
                    </span>
                    <AnswerSlot
                      solved={isAnswerKey}
                      answer={solvedUnknownAr}
                      ariaLabel="مربع كتابة الجزء الناقص (كم بقي؟)"
                      kind="unknown"
                      tone="amber"
                      solvedDataAttributes={{
                        "data-solved-take-away": solvedUnknownAr,
                      }}
                    />
                  </div>
                ) : (
                  item.responseModel && (
                    <VisualModelView
                      model={item.responseModel}
                      solved={isAnswerKey}
                    />
                  )
                )}
                {item.companionBondModel && (
                  <VisualModelView
                    model={item.companionBondModel}
                    solved={isAnswerKey}
                  />
                )}
              </div>

              {data.showTermLabels && (
                <div
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-50/70 px-2 py-0.5 text-[13px] font-extrabold text-indigo-950"
                  data-term-labels="true"
                >
                  <span className="text-indigo-900">
                    الكلّ{isAnswerKey ? ` (${item.totalAr})` : ""}
                  </span>
                  <span className="text-indigo-400">−</span>
                  <span className="text-sky-900">
                    الجزء{isAnswerKey ? ` (${item.partTakenAwayAr})` : ""}
                  </span>
                  <span className="text-indigo-400">=</span>
                  <span className="text-amber-900">
                    الجزء{isAnswerKey ? ` (${item.missingPartAr})` : ""}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </ExerciseColumns>
    </div>
  );
}
