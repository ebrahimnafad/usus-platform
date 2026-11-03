# Independent domain modules with a shared hub

The platform now hosts two teaching domains — Mathematics and Reading Comprehension — with fundamentally different workflows (sidebar + A4 canvas vs. story-cycle stepper + teacher co-pilot). Rather than forcing both into a shared layout shell, each domain owns its own page tree and layout components. A domain-selection hub at `/` provides the entry point, with Math at `/math` and Reading at `/reading`.

We considered a unified shell with a persistent navbar and domain switcher, but the two domains have so little layout in common that the shared shell would be either too generic to be useful or too complex to maintain. The hub-and-independent-layouts approach gives each domain full control over its UX while sharing infrastructure (print engine, font stack, A4 page constraints) at the component level.
