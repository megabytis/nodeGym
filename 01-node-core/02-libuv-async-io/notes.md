#### Synchronous Operations in Node.js
(Like a Linear Food Order Queue)

  "Synchronous" = Finish one task completely before starting the next.

------- Example Scenario -------
-------

Timeline (minutes):
  0     5         10      15
|─────|─────────|───────|──────|
[Coke] [Noodles] [Pizza] [Fries]

Order Queue by persons:
person-1. Coke        [0 min]   : will wait 0 minutes
person-2. Noodles     [5 min]   : will wait 5 minutes
person-3. Pizza       [10 min]  : will wait 15 minutes
person-4. Fries       [15 min]  : will wait 30 minutes
person-5. Noodles     [5 min]   : will wait 35 minutes
person-6. Coke        [0 min]   : will wait 35 minutes

=> Total time till 6th person: 35 minutes

so here we have a synchronous operation where each person waits for the previous person to finish their order before placing their own order. This ensures that the orders are processed in the correct order and that there are no conflicts or delays in the food preparation process.

-> here look at the person-6, it's taking 50 minutes to get a coke, which should take only 0 minutes 🤣, but it's a synchronous operation, so it has to wait for the previous person to finish their order. This is because SYNCHRONOUS OPERATIONS are executed one after the other, and the next operation cannot start until the previous one is completed.

#### Asynchronous Operations in Node.js
(Like a Fast Food Drive-Thru with Multiple Windows)

  "Asynchronous" = Start tasks immediately and handle them when ready, without waiting.

Order Queue by persons:
person-1. Coke        [0 min]   : instantly served
person-2. Noodles     [5 min]   : cooking will be started & 2nd person will wait in waiting area
person-3. Pizza       [10 min]  : cooking will be started & 3rd person will wait in waiting area
person-4. Fries       [15 min]  : cooking will be started & 4th person will wait in waiting area
person-5. Noodles     [5 min]  : cooking will be started & 5th person will wait in waiting area
person-6. Coke        [0 min]   : instantly served

so here we have an asynchronous operation where each person can place their order without waiting for the previous person to finish their order. This ensures that the orders are processed in the correct order and that there are no conflicts or delays in the food preparation process.

-> just after serving coke to person-1, immediately noodle's is gonna be prepared, after person-2 goes to waiting area, pizza will be prepared, after person-3 goes to waiting area, fries will be prepared after person-4 goes to waiting area, E.F.Noodles will be prepared after person-5 goes to waiting area, and coke will be served to person-6 instantly.

-> so, let's calculate, from starting after 5 minutes person-2's noodles will be ready, then again 5 minutes later both 5th person's noodles(5minute after person-2's noodles) & 3rd person's pizza(10minute after person-2's noodles) will be ready, and then 5 minutes later 4th person's fries(15minute after person-2's noodles or 5minute after person-5's noodles / 5 minute after person-3's pizza) will be ready.

=> Total time till 6th person: 15 minutes(vs 35 mins in sync!)
