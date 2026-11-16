// Student Creations: case studies. Evidence-first rewrite (2026-11-16).
// Rules: no inferred software, goals or outcomes. Anything not shown by the evidence = "Not Verified".
// Review depth: documents and images were read in full; videos were seen ONLY as Drive's preview frame
// (playback requires sign-in). Video-based entries are therefore "Awaiting evidence".
// No student media is published: no release is on file for any project.

window.SEMESTER = "Fall 2026";
window.NV = "Not Verified";

window.COURSES = {
  "DMA 10": { name: "Introduction to Game Design" },
  "DMA 15": { name: "Interaction and UX Design" },
  "DMA 40": { name: "Advanced Multimedia Design" }
};

// Topic tags for filtering: they describe what the work is about, not verified techniques.
window.GROUPS = {
  "bed": { title: "Bed model / texture set", skills: ["3D modeling", "Texturing"] },
  "ocean": { title: "Ocean renders", skills: ["Environment & lighting"] },
  "fur": { title: "Fur-like surface render", skills: ["Materials"] },
  "grass": { title: "Grass render", skills: ["Materials"] },
  "planets": { title: "Planet renders", skills: ["Materials", "Environment & lighting"] },
  "ferris": { title: "Ferris wheel", skills: ["Physics / mechanics", "Level design"] },
  "roblox-basics": { title: "Studio scene", skills: ["Level design"] },
  "roblox-terrain": { title: "Terrain island", skills: ["Level design"] },
  "roblox-gui": { title: "Settings & health GUI", skills: ["UI / UX"] },
  "roblox-level": { title: "Level blockout", skills: ["Level design"] },
  "roblox-physics": { title: "Ramp with Start/Stop controls", skills: ["Physics / mechanics", "UI / UX"] },
  "level-canyon": { title: "Canyon level", skills: ["Level design"] },
  "level-corridor": { title: "Corridor level", skills: ["Level design"] },
  "ux-pseudoregalia": { title: "UX breakdown: metroidvania", skills: ["UX analysis"] },
  "ux-pseudoregalia?": { title: "Image archive (5 images)", skills: [] },
  "ux-sonic": { title: "Interface flow: platformer", skills: ["UX analysis"] },
  "ux-gmod": { title: "Menu map: sandbox game", skills: ["UX analysis"] },
  "ux-animalcrossing": { title: "UX analysis: life-sim", skills: ["UX analysis"] },
  "ux-taiko": { title: "UX map: rhythm game", skills: ["UX analysis"] },
  "ux-galaxian": { title: "UX evaluation: arcade shooter", skills: ["UX analysis"] },
  "env-domes": { title: "Domed environment", skills: ["Environment & lighting"] },
  "landscape": { title: "Landscape", skills: ["Environment & lighting", "Level design"] },
  "landscape-b": { title: "Forest clearing", skills: ["Environment & lighting"] },
  "minecraft": { title: "Minecraft build / texture", skills: ["Level design", "Texturing"] },
  "bounce": { title: "Bouncing ball", skills: ["Animation"] },
  "obby": { title: "Obstacle course", skills: ["Level design"] },
  "hud": { title: "Health & energy bar", skills: ["UI / UX"] },
  "midterm-ui": { title: "Midterm UI prototyping", skills: ["UI / UX"] },
  "snow": { title: "Snow scene 2.0", skills: ["Environment & lighting"] },
  "snow-b": { title: "Snowy terrain", skills: ["Environment & lighting"] },
  "wheat": { title: "Wheat field", skills: ["Environment & lighting"] },
  "unity-runway": { title: "Runway scene", skills: ["Level design"] },
  "catch": { title: "Catch game", skills: ["Physics / mechanics"] },
  "particles": { title: "Glowing particles", skills: ["VFX"] },
  "platforms": { title: "Platform course", skills: ["Level design"] },
  "marble": { title: "Marble-run scene", skills: ["Environment & lighting", "Materials"] },
  "ball-physics": { title: "Ball physics", skills: ["Physics / mechanics"] },
  "-": { title: "Unclassified", skills: [] }
};

// status: "partial" = content inspected in full, but course/assignment/permission unconfirmed
//         "awaiting" = video seen only as a preview frame; footage not yet inspected
window.PROJECTS = [
{
  id: "ux-galaxian", home: true, status: "partial",
  title: "Visual UX Evaluation and Interface logic Map (Galaxian)", titleSource: "Title of the submitted PDF",
  attribution: "Student D", course: "DMA 15", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "PDF, 2 pages", software: "Not Verified (PDF export)", topics: ["UX analysis"],
  assignmentGoal: "Not Verified: no assignment document provided. The PDF follows the same five headings (user/player, goals, inputs, feedback, navigation) used in four other submissions in the folder.",
  created: "A two-page poster evaluating the arcade game Galaxian. Page 1 covers the user/player, goals, inputs, feedback, and navigation/HUD, including where score, the '1UP' indicator and remaining lives appear. Page 2 is a written 'UX / Technical Reflection'.",
  skills: ["Applies all five headings of the analysis framework to one game", "Identifies feedback events: enemies explode, score increases, sound effects, ship destroyed = life lost", "Describes HUD element placement", "Writes a reflection on what the analysis revealed"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-42", "PDF, 2 pages: read in full"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "ux-pseudoregalia", home: false, status: "partial",
  title: "Breaking Down Game UXUI", titleSource: "Title of the submitted PDF",
  attribution: "Student E", course: "DMA 15", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "PDF, 7 pages (exported with the prefix 'annotated-')", software: "Not Verified (PDF export)", topics: ["UX analysis"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "A seven-page UX/UI breakdown of the game Pseudoregalia: a table covering player, goals, input, feedback and navigation; the title-screen flow (noting that 'Continue' appears only after a first save file exists); in-game and ESC menus; and sub-menus (items, map, attire, game). Annotated screenshots throughout.",
  skills: ["Maps a screen-by-screen menu flow", "Notes a state-dependent menu option ('Continue' after first save)", "Describes menu and sub-menu hierarchy", "Comments on what the game's opening does not tell the player"],
  support: "The filename prefix 'annotated-' suggests an export with instructor annotations. The annotations were not reviewed for publication and are kept private.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-13", "PDF, 7 pages: text read in full"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "ux-taiko", home: false, status: "partial",
  title: "Taiko no Tatsujin: Drum 'n' Fun", titleSource: "Heading on the student's board ('Game UX Analysis and Interface Map')",
  attribution: "Student F", course: "DMA 15", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "Screenshot of an online whiteboard", software: "Not Verified (whiteboard app not identified)", topics: ["UX analysis"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "A whiteboard map with a game overview; five framework cards (player, goals, inputs, feedback, navigation/hierarchy); a screen flow from main title through mode select, song select, difficulty select and gameplay to results; key takeaways; a reflection; and a 'Notes/Improvements' column.",
  skills: ["Diagrams a six-screen interface flow", "Adds suggested improvements in a 'Notes/Improvements' column"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-38", "Image: viewed in full"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "bed-texture", home: true, status: "partial",
  title: "Untitled bed texture (two screenshots)", titleSource: "No title in the evidence",
  attribution: "Student J", course: "DMA 40", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "Two PNG screenshots, 13 minutes apart (3:31 PM and 3:44 PM, Sep 17)", software: "Substance 3D Painter (interface visible in the 3:31 PM screenshot)", topics: ["Texturing", "3D modeling"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "First screenshot: a pink bed model in progress in Substance 3D Painter, next to a red texture map. Second screenshot: a rendered bed with wood frame, red blanket and white pillows on a black background.",
  skills: ["Texturing a bed model in Substance 3D Painter (first screenshot)", "Separate-looking wood, blanket and pillow surfaces in the final render"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-39", "Image, 3:31 PM: viewed in full"], ["W1-40", "Image, 3:44 PM: viewed in full"]],
  sequence: [
    { stage: "Earlier", text: "3:31 PM: in-progress texture in Substance 3D Painter.", ref: "W1-39" },
    { stage: "Later", text: "3:44 PM: rendered bed.", ref: "W1-40" }
  ],
  sequenceNote: "These may be two stages of one student's work: same date, 13 minutes apart, same filename pattern. This is unconfirmed, and no feedback or revision is documented.",
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "planets", home: false, status: "partial",
  title: "LoneGasGiant / Untitled", titleSource: "Image filenames",
  attribution: "Students K & L (two files; authorship unconfirmed)", course: "DMA 40", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "Two PNG images", software: "Not Verified (renders only)", topics: ["Materials", "Environment & lighting"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Image 1: a banded pink gas-giant planet against a purple nebula. Image 2: an Earth-like planet with a cloud layer and a glowing atmosphere edge over a purple nebula.",
  skills: ["Finished planet renders with surface banding (image 1) and cloud layer plus atmosphere glow (image 2)"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-25", "Image: viewed in full"], ["W1-41", "Image: viewed in full"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "dma15-landscape", home: true, status: "awaiting",
  title: "Week7DMA15", titleSource: "Video filename",
  attribution: "Student I", course: "DMA 15", courseStatus: "verified", weeks: "Week 7 (from filename)",
  format: "Screen recording (Unreal Editor, Oct 12, 2026)", software: "Unreal Engine (named in filename)", topics: ["Environment & lighting", "Level design"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Preview frame only: a pink sea with green islands and a tall spire, shown in the Unreal Editor.",
  skills: ["Not Verified: footage not yet inspected"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W4-20", "Video: preview frame only"]],
  note: "The only file in the folder whose name states its course (DMA 15).",
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "catch-game", home: true, status: "awaiting",
  title: "Untitled catch game (recordings + 2 GIFs)", titleSource: "No title in the evidence",
  attribution: "Student A (authorship of all five files unconfirmed)", course: "DMA 10", courseStatus: "unverified", weeks: "Weeks 7–9 folder",
  format: "3 screen recordings (Oct 13, Oct 13, Oct 15) + 2 GIFs", software: "Not Verified (runs in a web browser)", topics: ["Physics / mechanics"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "From the GIFs (viewed) and preview frames: a single-screen game with a player sprite at the bottom, falling items and an on-screen 'SCORE' counter. One GIF shows 'SCORE= 32'.",
  skills: ["A playable game screen with a score display (GIF)", "Other mechanics: Not Verified (footage not yet inspected)"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W7-12", "Video, Oct 13 4:13 PM: preview frame only"], ["W7-13", "Video, Oct 13 5:04 PM: preview frame only"], ["W7-16", "Video, Oct 15: preview frame only"], ["W7-22", "GIF: viewed"], ["W7-23", "GIF: viewed"]],
  sequence: [
    { stage: "Oct 13, 4:13 PM", text: "Preview frame: magenta ground, score 10.", ref: "W7-12" },
    { stage: "Oct 13, 5:04 PM", text: "Preview frame: green ground, heart item.", ref: "W7-13" },
    { stage: "Oct 15", text: "Preview frame: several falling sprites.", ref: "W7-16" },
    { stage: "GIFs", text: "Score 32, several item types.", ref: "W7-22 · W7-23" }
  ],
  sequenceNote: "The files look like versions of one game over three days. It is unconfirmed whether they are by one student, and no feedback or revision is documented.",
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "ferris-motor", home: true, status: "awaiting",
  title: "fixed version of ferris wheel morter", titleSource: "Video filename (original spelling)",
  attribution: "Student B", course: "DMA 10", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "Screen recording", software: "Roblox Studio (interface visible in preview frame)", topics: ["Physics / mechanics"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Preview frame only: a ferris wheel being play-tested in Roblox Studio, with an on-screen panel containing green and red buttons.",
  skills: ["Not Verified: footage not yet inspected"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-23", "Video: preview frame only"]],
  note: "The filename describes this as a fixed version. The earlier version isn't identifiable in the folder. Six other ferris wheel recordings exist, possibly by other students.",
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "twilight-obby", home: false, status: "awaiting",
  title: "Twilight Obby", titleSource: "In-game welcome banner visible in the preview frame",
  attribution: "Student C", course: "DMA 10", courseStatus: "unverified", weeks: "Weeks 7–9 folder",
  format: "Screen recording", software: "Roblox (interface visible in preview frame)", topics: ["Level design"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Preview frame only: a 'Welcome to Twilight Obby!' banner over an avatar on a path through a dusk forest.",
  skills: ["On-screen welcome banner (visible)", "Other: Not Verified (footage not yet inspected)"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W7-19", "Video: preview frame only"]],
  privacy: "A Roblox username is visible on screen and must be blurred before any publication.",
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "roblox-gui", home: false, status: "awaiting",
  title: "Demonstrate - Foundations - Roblox Studio Basics; GUI & User Interface Design", titleSource: "Video filename (reads like an assignment name)",
  attribution: "Student G", course: "DMA 15", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "Screen recording", software: "Roblox Studio (named in filename; interface visible)", topics: ["UI / UX"],
  assignmentGoal: "Partially Verified: the filename names the assignment ('Roblox Studio Basics; GUI & User Interface Design'). Its goals are not documented.",
  created: "Preview frame only: an on-screen settings panel with two sliders (music and sound-effect icons), a close button, a gear icon and a heart health bar.",
  skills: ["Settings panel with two sliders and a health bar (visible)", "Whether the controls work: Not Verified"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-20", "Video: preview frame only"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "midterm-ui", home: false, status: "awaiting",
  title: "Midterm Assessment UI Prototyping", titleSource: "Video filename",
  attribution: "Student H", course: "DMA 15", courseStatus: "unverified", weeks: "Weeks 7–9 folder",
  format: "Screen recording", software: "Not Verified", topics: ["UI / UX"],
  assignmentGoal: "Partially Verified: the filename identifies a midterm UI-prototyping assessment. Its goals are not documented.",
  created: "Preview frame only: an avatar on a platform in a space scene, with a UI panel at top right.",
  skills: ["Not Verified: footage not yet inspected"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W7-06", "Video: preview frame only"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "ocean", home: false, status: "awaiting",
  title: "Ocean Wave Animation", titleSource: "Video filename",
  attribution: "Student M", course: "DMA 40", courseStatus: "unverified", weeks: "Weeks 1–3 folder",
  format: "Rendered video", software: "Not Verified (render only)", topics: ["Environment & lighting"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Preview frame only: a night ocean under stars and a green aurora.",
  skills: ["Not Verified: footage not yet inspected"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W1-27", "Video: preview frame only"]],
  note: "Seven ocean renders and one ocean viewport recording are in the same folder, possibly from a shared assignment (unconfirmed).",
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "snow-scene", home: false, status: "awaiting",
  title: "my unreal snow scene 2.0", titleSource: "Video filename",
  attribution: "Student N", course: "DMA 40", courseStatus: "unverified", weeks: "Weeks 7–9 folder",
  format: "Screen recording", software: "Unreal Engine (named in filename)", topics: ["Environment & lighting"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Preview frame only: a moonlit snow field with pine silhouettes and mountains, in an editor window.",
  skills: ["Not Verified: footage not yet inspected"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W7-08", "Video: preview frame only"]],
  note: "'2.0' in the filename suggests an earlier version. That version is not identifiable in the folder.",
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "marble-run", home: false, status: "awaiting",
  title: "Untitled marble-run scene", titleSource: "No title in the evidence",
  attribution: "Student O", course: "Not Verified", courseStatus: "unverified", weeks: "Weeks 7–9 folder",
  format: "Screen recording (Oct 22)", software: "Not Verified", topics: ["Environment & lighting", "Materials"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Preview frame only: glowing funnels, a spiral track, a wheel and coloured objects in a purple-lit room.",
  skills: ["Not Verified: footage not yet inspected"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W7-21", "Video: preview frame only"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
},
{
  id: "bouncing-ball", home: false, status: "awaiting",
  title: "Untitled bouncing ball (recording + 2 renders)", titleSource: "No title in the evidence",
  attribution: "Student P (authorship of the renders unconfirmed)", course: "DMA 40", courseStatus: "unverified", weeks: "Weeks 7–9 folder",
  format: "Screen recording + two short rendered videos", software: "Blender Grease Pencil (interface visible in preview frame)", topics: ["Animation"],
  assignmentGoal: "Not Verified: no assignment document provided.",
  created: "Preview frames only: a ball drawn over a U-shaped track with a keyframe timeline, and two short renders of the same layout (one solid ball, one outlined).",
  skills: ["Keyframes visible on the timeline", "Other: Not Verified (footage not yet inspected)"],
  support: "Not documented in the evidence provided.",
  outcome: "Not Verified: course SLOs not provided.",
  evidence: [["W7-20", "Video: preview frame only"], ["W7-01 · W7-02", "Videos: preview frame only"]],
  tenure: "Pending: LBCC Appendix E standards not yet reviewed.",
  permission: "Pending"
}
];

// Projects named by the instructor that could NOT be found in the shared folder (public view, signed out).
window.NOT_FOUND = ["Spider-Man VR Gallery", "Lonely Boat", "Fih Village", "Graveyard", "Projection mapping", "ShapesXR spatial-design projects", "Unity puzzle projects"];
