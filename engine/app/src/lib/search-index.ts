import {
  getLab,
  getListening,
  getOral,
  getQuestions,
  noteHref,
  readNote,
  shortTitle,
  subjects,
  type Subject,
} from "./content";

export type SearchKind = "Notes" | "Questions" | "Listening" | "Oral" | "Lab";

export type SearchDoc = {
  subject: string;
  subjectName: string;
  kind: SearchKind;
  title: string;
  href: string;
  text: string;
};

function plain(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-]+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function questionHref(subject: Subject, year: number, section: string, number: number): string {
  return `/${subject.slug}/questions/#q-${year}-${section}-${number}`;
}

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const subject of subjects) {
    for (const note of subject.notes) {
      docs.push({
        subject: subject.slug,
        subjectName: subject.shortName,
        kind: "Notes",
        title: shortTitle(note.title),
        href: noteHref(subject, note),
        text: plain(readNote(note)).slice(0, 16000),
      });
    }

    for (const question of getQuestions(subject.slug)) {
      docs.push({
        subject: subject.slug,
        subjectName: subject.shortName,
        kind: "Questions",
        title: `Q${question.number} · ${question.title}`,
        href: questionHref(subject, question.year, question.section, question.number),
        text: plain(`${question.prompt} ${question.answer}`),
      });
    }

    for (const paper of getListening(subject.slug)) {
      docs.push({
        subject: subject.slug,
        subjectName: subject.shortName,
        kind: "Listening",
        title: `${paper.year} · Full transcript`,
        href: `/${subject.slug}/listening/#transcript-${paper.year}`,
        text: plain(`${paper.transcript} ${paper.transcriptEn}`),
      });
      for (const question of paper.questions) {
        docs.push({
          subject: subject.slug,
          subjectName: subject.shortName,
          kind: "Listening",
          title: `${paper.year} · Section ${question.number} · ${question.title}`,
          href: `/${subject.slug}/listening/#listen-${paper.year}-q-${question.number}`,
          text: plain(`${question.prompt} ${question.answer}`),
        });
      }
    }

    const oral = getOral(subject.slug);
    oral.roleplays.forEach((roleplay, index) => {
      docs.push({
        subject: subject.slug,
        subjectName: subject.shortName,
        kind: "Oral",
        title: `Roleplay ${String(index + 1).padStart(2, "0")} · ${roleplay.title}`,
        href: `/${subject.slug}/oral/#rp-${index + 1}`,
        text: plain(`${roleplay.situation} ${roleplay.points.join(" ")} ${roleplay.phrases.join(" ")}`),
      });
    });
    oral.conversation.forEach((topic, topicIndex) => {
      topic.questions.forEach((question, questionIndex) => {
        docs.push({
          subject: subject.slug,
          subjectName: subject.shortName,
          kind: "Oral",
          title: `${topic.title} · ${question.question}`,
          href: `/${subject.slug}/oral/#conversation-${topicIndex + 1}-${questionIndex + 1}`,
          text: plain(question.answer),
        });
      });
    });

    for (const paper of getLab(subject.slug)) {
      for (const part of paper.parts) {
        docs.push({
          subject: subject.slug,
          subjectName: subject.shortName,
          kind: "Lab",
          title: `${paper.year} ${part.letter} · ${part.title}`,
          href: `/${subject.slug}/section-c/#paper-${paper.year}-${part.letter.replace(/[()]/g, "")}`,
          text: plain(`${part.prompt} ${part.tasks.join(" ")}`),
        });
      }
    }
  }

  return docs;
}
