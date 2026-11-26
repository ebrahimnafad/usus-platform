# 02: Add compact emoji stepper for mobile

**What to build:** A new compact stepper visible only below 640px renders six 40×40px circles in a horizontal flex row, each containing the Station's emoji icon (📖 ⚡ 🔍 🧩 ✍️ 🏁). The active Station gets the theme colour fill (emerald-600 for standard stories, indigo-600 for Transfer Tests). Past Stations get a green tint (`bg-emerald-50 border-emerald-200`). Future Stations get a neutral slate tint. Tapping a circle switches the active Station. The existing desktop stepper (with text labels and `min-w-[620px]`) is hidden on mobile and shown on desktop.

**Blocked by:** None (can start immediately).

**Status:** done

- [ ] A new stepper section with `sm:hidden` renders six `w-10 h-10` circles, each containing one of 📖 ⚡ 🔍 🧩 ✍️ 🏁
- [ ] Active circle gets theme colour fill; past circles get green tint; future circles get slate tint
- [ ] Each circle is a tappable button wired to `setActiveStation`
- [ ] The existing desktop stepper section gets `hidden sm:block` (or `hidden sm:flex`) so it hides on mobile and shows on desktop
- [ ] On desktop (≥ sm), only the existing label-based stepper renders — no visual change
- [ ] Test assertions verify both stepper elements exist with correct visibility classes, and the mobile stepper contains all six emoji icons
