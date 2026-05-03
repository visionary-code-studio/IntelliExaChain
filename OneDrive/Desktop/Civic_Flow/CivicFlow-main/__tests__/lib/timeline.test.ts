import { describe, it, expect } from "vitest";
import {
  timelineStages,
  getStageBySlug,
  getAdjacentStages,
} from "@/lib/data/timeline";

describe("timelineStages data", () => {
  it("contains exactly 8 stages", () => {
    expect(timelineStages).toHaveLength(8);
  });

  it("every stage has all required fields", () => {
    const requiredFields = [
      "id",
      "slug",
      "phase",
      "title",
      "shortTitle",
      "emoji",
      "color",
      "duration",
      "summary",
      "description",
      "whatHappens",
      "whyItMatters",
      "voterAction",
      "commonMistakes",
      "checklistItems",
      "faq",
      "countryNotes",
    ] as const;

    timelineStages.forEach((stage) => {
      requiredFields.forEach((field) => {
        expect(stage).toHaveProperty(field);
        expect(stage[field]).toBeDefined();
      });
    });
  });

  it("stage IDs are sequential from 1 to 8", () => {
    timelineStages.forEach((stage, index) => {
      expect(stage.id).toBe(index + 1);
    });
  });

  it("stage slugs are unique and non-empty", () => {
    const slugs = timelineStages.map((s) => s.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(8);
    slugs.forEach((slug) => expect(slug.length).toBeGreaterThan(0));
  });

  it("every stage phase is one of valid values", () => {
    const validPhases = ["Pre-Election", "Election Day", "Post-Election"];
    timelineStages.forEach((stage) => {
      expect(validPhases).toContain(stage.phase);
    });
  });

  it("every stage has at least one FAQ entry", () => {
    timelineStages.forEach((stage) => {
      expect(stage.faq.length).toBeGreaterThan(0);
      stage.faq.forEach((item) => {
        expect(item.question).toBeTruthy();
        expect(item.answer).toBeTruthy();
      });
    });
  });

  it("every stage has at least one countryNote", () => {
    timelineStages.forEach((stage) => {
      expect(stage.countryNotes.length).toBeGreaterThan(0);
      stage.countryNotes.forEach((note) => {
        expect(note.country).toBeTruthy();
        expect(note.flag).toBeTruthy();
        expect(note.note).toBeTruthy();
      });
    });
  });

  it("every stage has at least one checklist item", () => {
    timelineStages.forEach((stage) => {
      expect(stage.checklistItems.length).toBeGreaterThan(0);
    });
  });
});

describe("getStageBySlug", () => {
  it("returns correct stage for a valid slug", () => {
    const stage = getStageBySlug("voter-registration");
    expect(stage).toBeDefined();
    expect(stage?.id).toBe(1);
    expect(stage?.title).toBe("Voter Registration");
  });

  it("returns undefined for an invalid slug", () => {
    const stage = getStageBySlug("non-existent-slug");
    expect(stage).toBeUndefined();
  });

  it("returns correct stage for last slug", () => {
    const stage = getStageBySlug("result-declaration");
    expect(stage).toBeDefined();
    expect(stage?.id).toBe(8);
  });
});

describe("getAdjacentStages", () => {
  it("first stage has no prev and a next", () => {
    const { prev, next } = getAdjacentStages("voter-registration");
    expect(prev).toBeNull();
    expect(next).not.toBeNull();
    expect(next?.id).toBe(2);
  });

  it("last stage has a prev and no next", () => {
    const { prev, next } = getAdjacentStages("result-declaration");
    expect(prev).not.toBeNull();
    expect(prev?.id).toBe(7);
    expect(next).toBeNull();
  });

  it("middle stage has both prev and next", () => {
    const { prev, next } = getAdjacentStages("voting-process");
    expect(prev).not.toBeNull();
    expect(next).not.toBeNull();
  });

  it("invalid slug returns both null", () => {
    const { prev, next } = getAdjacentStages("bad-slug");
    expect(prev).toBeNull();
    expect(next).toBeNull();
  });
});
