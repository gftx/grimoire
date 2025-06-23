import { useEffect, useState } from "react";
import { journalApi } from "@/entities/journal/api";
import { JournalEntry } from "@/entities/journal/types";
import { TiptapEditor } from "@/shared/ui/TipTapEditor";
import styles from "./styles.module.scss";
import { ResponsiveDatePicker } from "@/shared/ui/DatePicker";
import dayjs from "dayjs";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export const JournalPage = () => {
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const selectedISO = selectedDate.toISOString().slice(0, 10);
  const debouncedContent = useDebounce(content, 1500);

  useEffect(() => {
    setLoading(true);
    journalApi.getByDate(selectedISO).then((data) => {
      const dayEntry = data[0] || null;
      setEntry(dayEntry);
      setContent(dayEntry ? dayEntry.content : "");
      setLoading(false);
    });
  }, [selectedISO]);

  useEffect(() => {
    if (loading) return; // Don't autosave while loading
    if (!debouncedContent.trim()) return;
    if (debouncedContent === (entry?.content ?? "")) return;
    // Autosave
    (async () => {
      if (entry) {
        setSaving(true);
        const updated = await journalApi.update(entry.id, { content: debouncedContent });
        setEntry(updated);
        setSaving(false);
      } else {
        setSaving(true);
        const created = await journalApi.create({ date: selectedISO, content: debouncedContent });
        setEntry(created);
        setSaving(false);
      }
    })();
  }, [debouncedContent, entry, loading, selectedISO]);

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
        <ResponsiveDatePicker
          value={dayjs(selectedDate)}
          onChange={d => setSelectedDate(d.toDate())}
          textFieldProps={{ className: styles.datePicker }}
        />
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
