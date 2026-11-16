// FEEDBACK → ACTION → IMPROVEMENT
// Each theme is tied to its exact source (course report + page + item or comment).
// Responses come from the instructor's own description (Nov 16, 2026 brief). None has an implementation
// date or evidence yet, so all are "Reported, not verified" and none is classified as established / after
// feedback / underway / future until evidence arrives.

window.STATUS_LEGEND = {
  established: "Already established practice (evidence dated before the feedback)",
  after: "Implemented after feedback (dated evidence)",
  underway: "Improvement currently underway",
  future: "Future instructional goal",
  reported: "Reported by instructor: not yet verified or classified"
};

window.FEEDBACK = [
{
  theme: "Pacing and switching software too quickly",
  course: "DMA 10",
  evidence: [
    { kind: "comment", ref: "DMA 10 report, p. 5 (suggestion)", text: "not have it feel like rush crash course making it feel discouraging when someone gets left behind or not following as fast." },
    { kind: "comment", ref: "DMA 10 report, p. 5 (same comment)", text: "stay on one gaming programs and follow a course for it for longer […] not switch rapidly between multiple programs" },
    { kind: "item", ref: "DMA 10 report, p. 4, item 7", text: "More than one explanation of difficult points: 6 of 7 positive, 1 Disagree." }
  ],
  responses: ["More deliberate introductory software instruction", "Greater attention to pacing and checks for understanding"],
  status: "reported"
},
{
  theme: "Clarity of subject presentation",
  course: "DMA 10",
  evidence: [
    { kind: "item", ref: "DMA 10 report, p. 3, item 6", text: "The instructor presented the subject matter clearly: 4 of 7 positive (3 Strongly Agree, 1 Agree), 3 Disagree." },
    { kind: "contrast", ref: "DMA 10 report, p. 5 (strength)", text: "able to explain subjects in detail to make it more understandable" }
  ],
  responses: ["Step-by-step demonstrations", "Greater attention to pacing and checks for understanding"],
  status: "reported"
},
{
  theme: "Course organization and weekly structure",
  course: "DMA 10",
  evidence: [
    { kind: "comment", ref: "DMA 10 report, p. 5 (suggestion)", text: "The class could improve by implementing a more intentional, and organized lecture/lab environment […] activities for each class often feel disjointed" },
    { kind: "comment", ref: "DMA 10 report, p. 5 (suggestion)", text: "DMA 10 could benefit from a slightly more rigid structure in terms of week to week assignments." }
  ],
  responses: ["Improved Canvas organization"],
  status: "reported"
},
{
  theme: "Assignment clarity and visual instructions",
  course: "DMA 10 · DMA 15",
  evidence: [
    { kind: "comment", ref: "DMA 10 report, p. 5 (suggestion)", text: "make sure that people are able to be on the same page and able to see the instructions clearly" },
    { kind: "comment", ref: "DMA 15 report, p. 5 (suggestion)", text: "maybe more visual instructions." },
    { kind: "comment", ref: "DMA 15 report, p. 5 (suggestion)", text: "he could improve on stating what actually needs to be completed for the assignment we have due and what criteria we need to hit." }
  ],
  responses: ["Clearer visual assignment instructions", "Student-friendly checklists"],
  status: "reported"
},
{
  theme: "Supplemental tutorials tied to each week",
  course: "DMA 10",
  evidence: [
    { kind: "comment", ref: "DMA 10 report, p. 5 (suggestion)", text: "have more videos that are tied to the lesson of the week for extra help," }
  ],
  responses: ["Alternative learning materials", "Step-by-step demonstrations"],
  status: "reported"
},
{
  theme: "Technical problems with lab hardware and software",
  course: "DMA 10 · DMA 15",
  evidence: [
    { kind: "comment", ref: "DMA 10 report, p. 5 (suggestion)", text: "lose track of time as a result of unexpected technical issues/troubleshooting with hardware/software […] use software that is more beginner–friendly and usable even on lower–end devices" },
    { kind: "comment", ref: "DMA 15 report, p. 5 (suggestion)", text: "This is not his fault but there are often technical problems with the computers and the programs." }
  ],
  responses: ["Blender and Unreal Engine troubleshooting", "Individual technical support"],
  status: "reported"
},
{
  theme: "Timeliness of feedback",
  course: "DMA 10",
  evidence: [
    { kind: "item", ref: "DMA 10 report, p. 4, item 9", text: "Helpful feedback in a timely manner: 5 of 7 positive, 2 Disagree." },
    { kind: "contrast", ref: "DMA 15 report, p. 4, item 9", text: "Same item in DMA 15: 7 of 7 Strongly Agree." }
  ],
  responses: [],
  status: "reported"
},
{
  theme: "Feeling left behind / comfort asking questions",
  course: "DMA 10",
  evidence: [
    { kind: "comment", ref: "DMA 10 report, p. 5 (suggestion)", text: "asking questions at times makes me dumb for asking and feeling im now slowing the class down, when we are in a introduction class." },
    { kind: "contrast", ref: "DMA 15 report, p. 5 (strength)", text: "encourages us to ask questions and responds to feedback quickly, and he ensures that there are no \"stupid\" questions." }
  ],
  responses: ["Greater attention to pacing and checks for understanding"],
  status: "reported"
},
{
  theme: "Office-hour use",
  course: "DMA 10",
  evidence: [
    { kind: "item", ref: "DMA 10 report, p. 2", text: "Have you visited your instructor during their student office hours? 0 Yes, 7 No." },
    { kind: "contrast", ref: "DMA 15 report, p. 2", text: "DMA 15: 3 Yes, 4 No. All 3 visitors Strongly Agreed the instructor was available and the time was helpful." }
  ],
  responses: [],
  status: "reported"
},
{
  theme: "More 3D animation and VR content",
  course: "DMA 40",
  evidence: [
    { kind: "comment", ref: "DMA 40 report, p. 4 (suggestion)", text: "By teaching us some 3d animation and virtual reality stuff." }
  ],
  responses: ["Additional VR/XR learning opportunities"],
  status: "reported"
},
{
  theme: "Class meeting time",
  course: "DMA 15",
  evidence: [
    { kind: "comment", ref: "DMA 15 report, p. 5 (suggestion)", text: "DMA 15 really needs a second meeting. Once a week for 2 hours really isn't enough time to cover all the material" }
  ],
  responses: [],
  status: "reported",
  note: "The student attributes this to scheduling, not to the instructor (\"I know this isn't his fault\")."
}
];
