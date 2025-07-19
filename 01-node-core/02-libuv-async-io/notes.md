#### Synchronous Operations in Node.js
(Like a Linear Food Order Queue)

    "Synchronous" = Finish one task completely before starting the next.

------- Example Scenario -------
-------

Timeline (minutes):
  0     5         10      15        20
|─────|─────────|───────|───────|─────────────|
[Coke] [Noodles] [Pizza] [Fries] [E.F.Noodles]

Order Queue by persons:
person-1. Coke        [0 min]   : will wait 0 minutes
person-2. Noodles     [5 min]   : will wait 5 minutes
person-3. Pizza       [10 min]  : will wait 15 minutes
person-4. Fries       [15 min]  : will wait 30 minutes
person-5. E.F.Noodles [20 min]  : will wait 50 minutes
person-6. Coke        [0 min]   : will wait 50 minutes

so here we have a synchronous operation where each person waits for the previous person to finish their order before placing their own order. This ensures that the orders are processed in the correct order and that there are no conflicts or delays in the food preparation process.
