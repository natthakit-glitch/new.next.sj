"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import type { Game, GameStatus } from "@/types/game";

// เก็บข้อมูลที่กรอกในฟอร์มทั้งหมดไว้ในก้อนเดียว
export type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus | "";
};

// เก็บข้อความแจ้งเตือนของแต่ละช่อง
type FormErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

// ค่าเริ่มต้นตอนเพิ่มเกมใหม่
const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "",
};

// ถ้าเป็นการแก้ไข จะเอาข้อมูลเดิมมาใส่ในฟอร์ม
function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }

  return {
    name: game.name,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
  };
}

export default function GameForm({
  initialGame,
  onSave,
  onCancel,
}: GameFormProps) {

  // เก็บค่าของ Input ทั้งหมด เพื่อทำ Controlled Input
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));

  // เก็บ Error ไว้แสดงใต้ช่องที่กรอกผิด
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};

    // ตรวจสอบว่าชื่อเกมถูกกรอกหรือยัง
    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อเกม";
    }

    // ตรวจสอบว่ามีการเลือกแพลตฟอร์มหรือไม่
    if (value.platform.trim() === "") {
      nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    }

    const hours = Number(value.hours);

    // จำนวนชั่วโมงต้องเป็นจำนวนเต็มและมากกว่า 0
    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    // ตรวจสอบว่ามีการเลือกสถานะหรือไม่
    if (value.status === "") {
      nextErrors.status = "กรุณาเลือกสถานะ";
    }

    return nextErrors;
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    // เปลี่ยนค่าของช่องที่ผู้ใช้กำลังกรอก โดยค่าช่องอื่นยังเหมือนเดิม
    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ตรวจสอบข้อมูลก่อนส่งไปบันทึก
    const nextErrors = validate(draft);
    setErrors(nextErrors);

    // ถ้ามีข้อมูลผิดจะยังไม่บันทึก
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // ส่งข้อมูลที่กรอกกลับไปให้ GameExplorer
    onSave(draft);

    // ล้างฟอร์มหลังบันทึกเสร็จ
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      <div className="game-form-header">
        {/* เปลี่ยนข้อความตามว่าเป็นการเพิ่มหรือแก้ไขเกม */}
        <h2>{initialGame ? "แก้ไขเกม" : "เพิ่มเกม"}</h2>

        <p>
          {initialGame
            ? "แก้ไขข้อมูลเกมแล้วกดบันทึก"
            : "กรอกข้อมูลเกมที่ต้องการเพิ่มลงในรายการ"}
        </p>
      </div>

      <div className="game-form-grid">
        <div className="game-form-group">
          <label htmlFor="game-name">ชื่อเกม</label>

          <input
            id="game-name"
            name="name"
            type="text"
            value={draft.name}
            onChange={handleChange}
            placeholder="เช่น Elden Ring"
            aria-invalid={!!errors.name}
            aria-describedby={
              errors.name ? "game-name-error" : undefined
            }
          />

          {/* แสดงข้อความเมื่อชื่อเกมไม่ผ่านการตรวจสอบ */}
          {errors.name ? (
            <p id="game-name-error" className="game-form-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="game-form-group">
          <label htmlFor="game-platform">แพลตฟอร์ม</label>

          <select
            id="game-platform"
            name="platform"
            value={draft.platform}
            onChange={handleChange}
            aria-invalid={!!errors.platform}
            aria-describedby={
              errors.platform ? "game-platform-error" : undefined
            }
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="Xbox Series X/S">Xbox Series X/S</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>

          {/* แสดงข้อความถ้ายังไม่ได้เลือกแพลตฟอร์ม */}
          {errors.platform ? (
            <p id="game-platform-error" className="game-form-error">
              {errors.platform}
            </p>
          ) : null}
        </div>

        <div className="game-form-group">
          <label htmlFor="game-hours">
            จำนวนชั่วโมงที่คาดว่าจะเล่น
          </label>

          <input
            id="game-hours"
            name="hours"
            type="number"
            min="1"
            step="1"
            value={draft.hours}
            onChange={handleChange}
            placeholder="เช่น 40"
            aria-invalid={!!errors.hours}
            aria-describedby={
              errors.hours ? "game-hours-error" : undefined
            }
          />

          {/* แสดงข้อความถ้าจำนวนชั่วโมงไม่ถูกต้อง */}
          {errors.hours ? (
            <p id="game-hours-error" className="game-form-error">
              {errors.hours}
            </p>
          ) : null}
        </div>

        <div className="game-form-group">
          <label htmlFor="game-status">สถานะ</label>

          <select
            id="game-status"
            name="status"
            value={draft.status}
            onChange={handleChange}
            aria-invalid={!!errors.status}
            aria-describedby={
              errors.status ? "game-status-error" : undefined
            }
          >
            <option value="">-- เลือกสถานะ --</option>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>

          {/* แสดงข้อความถ้ายังไม่ได้เลือกสถานะ */}
          {errors.status ? (
            <p id="game-status-error" className="game-form-error">
              {errors.status}
            </p>
          ) : null}
        </div>
      </div>

      <div className="game-form-actions">
        <button type="submit" className="game-save-button">
          บันทึก
        </button>

        {/* ปุ่มนี้จะแสดงตอนที่กำลังแก้ไขเกม */}
        {initialGame ? (
          <button
            type="button"
            className="game-cancel-button"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
        ) : null}
      </div>
    </form>
  );
}