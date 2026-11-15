import fs from "node:fs";
import path from "node:path";

export type NoteEntry = {
  slug: string;
  title: string;
  file: string;
};

export type RubricItem = {
  point: string;
  marks: number;
};

export type Question = {
  year: number;
  number: number;
  section: string;
  marks: number;
  chapter: string;
  title: string;
  prompt: string;
  answer: string;
  rubric: RubricItem[];
};

export type Topic = {
  slug: string;
  label: string;
};

export type SubjectStat = {
  value: string;
  label: string;
};

export type ListeningQuestion = {
  number: number;
  title: string;
  marks: number;
  prompt: string;
  answer: string;
};

export type ListeningPaper = {
  year: number;
  audio: string;
  duration: string;
  transcript: string;
  transcriptEn: string;
  questions: ListeningQuestion[];
};

export type Roleplay = {
  title: string;
  situation: string;
  points: string[];
  phrases: string[];
  model: string[];
};

export type ConversationQuestion = {
  question: string;
  answer: string;
};

export type ConversationTopic = {
  title: string;
  questions: ConversationQuestion[];
};

export type OralData = {
  roleplays: Roleplay[];
  conversation: ConversationTopic[];
};

export type Demo = {
  note: string;
  title: string;
  lang: "python" | "html" | "js";
  blurb: string;
  code: string;
};

export type LabPart = {
  letter: string;
  title: string;
  marks: string;
  split: string;
  prompt: string;
  tasks: string[];
  sample: string;
  starter: string;
  solution: string;
  scheme: string[];
};

export type LabPaper = {
  year: number;
  split: string;
  note: string;
  parts: LabPart[];
};

export type OriginalMock = {
  slug: string;
  year: number;
  title: string;
  minutes: number;
  blurb: string;
  questions: Question[];
};

export type Subject = {
  slug: string;
  name: string;
  shortName: string;
  level: string;
  brandSub: string;
  homeTitle: string;
  homeLede: string;
  startLabel: string;
  mockTitle: string;
  mockMinutes: number;
  mockBlurb: string;
  listeningNote?: string;
  oralNote?: string;
  labNote?: string;
  hasGuide: boolean;
  chapters: number;
  stats: SubjectStat[];
  topics: Topic[];
  notes: NoteEntry[];
};

type Manifest = {
  schemaVersion: number;
  subjects: Subject[];
};

type BankManifest = {
  schemaVersion: number;
  subjects: { slug: string; questions: Question[] }[];
};

type ListeningManifest = {
  schemaVersion: number;
  subjects: { slug: string; papers: ListeningPaper[] }[];
};

type OralManifest = {
  schemaVersion: number;
  subjects: ({ slug: string } & OralData)[];
};

type DemoManifest = {
  schemaVersion: number;
  subjects: { slug: string; demos: Demo[] }[];
};

type LabManifest = {
  schemaVersion: number;
  subjects: { slug: string; papers: LabPaper[] }[];
};

type OriginalMockManifest = {
  schemaVersion: number;
  subjects: OriginalMock[];
};

const repoRoot = path.resolve(process.cwd(), "../..");
const engineRoot = path.join(repoRoot, "engine");
const manifestPath = path.join(engineRoot, "shared", "subjects.json");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

function readSubjectFile<T>(slug: string, fileName: string): T | undefined {
  const file = path.join(repoRoot, "subjects", slug, "content", fileName);
  return fs.existsSync(file) ? readJson<T>(file) : undefined;
}

const manifest = readJson<Manifest>(manifestPath);

export const subjects = manifest.subjects;

export function getQuestions(slug: string): Question[] {
  const bank = readSubjectFile<BankManifest>(slug, "questions.json");
  return bank?.subjects.find((subject) => subject.slug === slug)?.questions ?? [];
}

export function getListening(slug: string): ListeningPaper[] {
  const listening = readSubjectFile<ListeningManifest>(slug, "listening.json");
  return listening?.subjects.find((subject) => subject.slug === slug)?.papers ?? [];
}

export function getOral(slug: string): OralData {
  const oral = readSubjectFile<OralManifest>(slug, "oral.json");
  const found = oral?.subjects.find((subject) => subject.slug === slug);
  return {
    roleplays: found?.roleplays ?? [],
    conversation: found?.conversation ?? [],
  };
}

export function getDemos(slug: string, note?: string): Demo[] {
  const demos = readSubjectFile<DemoManifest>(slug, "demos.json");
  const list = demos?.subjects.find((subject) => subject.slug === slug)?.demos ?? [];
  return note ? list.filter((demo) => demo.note === note) : list;
}

export function getLab(slug: string): LabPaper[] {
  const lab = readSubjectFile<LabManifest>(slug, "lab.json");
  return lab?.subjects.find((subject) => subject.slug === slug)?.papers ?? [];
}

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((subject) => subject.slug === slug);
}

export function getOriginalMock(slug: string): OriginalMock | undefined {
  const originalMock = readSubjectFile<OriginalMockManifest>(slug, "original-sample-paper-a.json");
  return originalMock?.subjects.find((paper) => paper.slug === slug);
}

export function readNote(note: NoteEntry): string {
  return fs.readFileSync(path.join(repoRoot, note.file), "utf8");
}

export function noteHref(subject: Subject, note: NoteEntry): string {
  return `/${subject.slug}/notes/${note.slug}/`;
}

export function subjectHref(subject: Subject): string {
  return `/${subject.slug}/`;
}

export function shortTitle(title: string): string {
  return title.includes(" · ") ? title.split(" · ").slice(1).join(" · ") : title;
}

export function wordCount(body: string): number {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

export function readMinutes(body: string): number {
  return Math.max(1, Math.ceil(wordCount(body) / 200));
}
