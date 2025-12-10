// This endpoint returns paginated combinations of player positions on a grid.
const cols = Math.max(1, parseInt(q.cols || '4', 10));
const players = Math.max(1, parseInt(q.players || '4', 10));
const page = Math.max(0, parseInt(q.page || '0', 10));
let limit = Math.max(1, parseInt(q.limit || '50', 10));
if (limit > MAX_LIMIT) limit = MAX_LIMIT;


const n = rows * cols;
if (players > n) {
res.status(400).json({ error: 'players cannot exceed grid cells' });
return;
}


// combinatorial count: C(n, players)
function nCr(n, r) {
if (r < 0 || r > n) return 0;
r = Math.min(r, n - r);
let numer = 1n, denom = 1n;
for (let i = 0; i < r; i++) {
numer *= BigInt(n - i);
denom *= BigInt(i + 1);
}
return numer / denom;
}


const total = nCr(n, players).toString();


// produce combinations in lexicographic order, but only return the requested window
// We'll implement an iterator that can skip the first `offset` combinations by using combinatorial indexing.


const offset = BigInt(page) * BigInt(limit);


// Convert index -> combination (combinatorial number system) for k-combination from n (0-based)
function unrankCombination(n, k, rank) {
// returns array of k indices (0..n-1)
// rank should be BigInt
const comb = [];
let x = rank;
let a = 0;
for (let i = 0; i < k; i++) {
let j = a;
while (true) {
const c = nCr(n - j - 1, k - i - 1);
if (c <= x) {
x -= c;
j += 1;
} else {
comb.push(j);
a = j + 1;
break;
}
}
}
return comb;
}


// Try to build the page
const combos = [];
let start = offset;
const totalBig = BigInt(nCr(n, players));
for (let i = 0; i < limit; i++) {
const idx = start + BigInt(i);
if (idx >= totalBig) break;
const combo = unrankCombination(n, players, idx);
combos.push(combo);
}


res.status(200).json({ rows, cols, players, page, limit: combos.length, total, combos });
}
