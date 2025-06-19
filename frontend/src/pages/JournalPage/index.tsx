import { useEffect, useState, useRef } from "react";
import { journalApi } from "@/entities/journal/api";
import { JournalEntry } from "@/entities/journal/types";
import { TiptapEditor } from "@/shared/ui/TipTapEditor";
import styles from "./styles.module.scss";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export const JournalPage = () => {
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const selectedISO = selectedDate.toISOString().slice(0, 10);

  useEffect(() => {
    setLoading(true);
    journalApi.getByDate(selectedISO).then((data) => {
      const dayEntry = data[0] || null;
      setEntry(dayEntry);
      setContent(dayEntry ? dayEntry.content : "");
      setLoading(false);
    });
  }, [selectedISO]);

  // Close calendar on outside click
  useEffect(() => {
    if (!showCalendar) return;
    function handleClick(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showCalendar]);

  const handleSave = async () => {
    setSaving(true);
    if (entry) {
      const updated = await journalApi.update(entry.id, { content });
      setEntry(updated);
      setContent(updated.content);
    } else {
      const created = await journalApi.create({ date: selectedISO, content });
      setEntry(created);
      setContent(created.content);
    }
    setSaving(false);
  };

  return (
    <div className={styles.journalPageContainer}>
      <div className={styles.journalDateRow}>
        <span className={styles.journalDate}>{formatDate(selectedDate)}</span>
        <button
          className={styles.calendarButton}
          aria-label="Pick date"
          onClick={() => setShowCalendar((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        </button>
        {showCalendar && (
          <div className={styles.calendarModal} ref={calendarRef}>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={date => {
                if (date) {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }
              }}
              weekStartsOn={1}
              showOutsideDays={false}
              fixedWeeks
              className={styles.dayPicker}
            />
          </div>
        )}
      </div>
      <div className={styles.journalEditor}>
        <TiptapEditor content={content} onChange={setContent} />
      </div>
      <div className={styles.journalSaveBar}>
        <button onClick={handleSave} disabled={saving || loading || !content.trim()} style={{padding: '10px 22px', borderRadius: 8, background: '#4f46e5', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer'}}>
          {entry ? (saving ? 'Saving...' : 'Update') : (saving ? 'Saving...' : 'Save')}
        </button>
      </div>
      {entry && (
        <div className={styles.journalEntryInfo}>
          Last updated: {new Date(entry.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </div>
  );
};
