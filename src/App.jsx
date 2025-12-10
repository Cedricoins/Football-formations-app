// This React component is a single-file UI to interact with the /api/combinations endpoint.
const cells = Array(rows * cols).fill(0);
if (combo) combo.forEach(i => (cells[i] = 1));
const grid = [];
for (let r = 0; r < rows; r++) {
const rowCells = [];
for (let c = 0; c < cols; c++) {
const idx = r * cols + c;
rowCells.push(
<div key={idx} className={`w-12 h-12 border flex items-center justify-center ${cells[idx] ? 'bg-green-400' : 'bg-white'}`}>
{cells[idx] ? '⚽' : ''}
</div>
);
}
grid.push(
<div key={r} className="flex gap-1">
{rowCells}
</div>
);
}
return <div className="inline-block p-4 bg-slate-50 rounded">{grid}</div>;
}


return (
<div className="p-6 font-sans">
<h1 className="text-2xl mb-4">Football formations — générateur de combinaisons</h1>


<div className="flex gap-4 mb-4 items-end">
<label className="flex flex-col">
Rows
<input type="number" value={rows} min={1} onChange={e => setRows(Number(e.target.value))} className="p-1 border rounded" />
</label>
<label className="flex flex-col">
Cols
<input type="number" value={cols} min={1} onChange={e => setCols(Number(e.target.value))} className="p-1 border rounded" />
</label>
<label className="flex flex-col">
Players
<input type="number" value={players} min={1} onChange={e => setPlayers(Number(e.target.value))} className="p-1 border rounded" />
</label>
<label className="flex flex-col">
Limit
<input type="number" value={limit} min={1} max={1000} onChange={e => setLimit(Number(e.target.value))} className="p-1 border rounded" />
</label>
<button onClick={() => { setPage(0); fetchPage(); }} className="px-4 py-2 bg-blue-600 text-white rounded">Run</button>
</div>


<div className="mb-4">
<button onClick={() => { if (page>0) { setPage(page-1); fetchPage(); } }} className="px-3 py-1 border rounded mr-2">Prev</button>
<button onClick={() => { setPage(page+1); fetchPage(); }} className="px-3 py-1 border rounded">Next</button>
<span className="ml-4">Page: {page}</span>
</div>


{loading && <div>Chargement...</div>}


{result && result.error && <div className="text-red-600">Erreur: {result.error}</div>}


{result && result.combos && (
<div className="flex gap-6">
<div>
<div className="mb-2">Combinaisons ({result.limit} affichées) — Total estimé: {result.total}</div>
<ul className="list-disc pl-6 max-h-80 overflow-auto">
{result.combos.map((c, idx) => (
<li key={idx} className={`cursor-pointer ${idx===selectedComboIndex? 'font-bold': ''}`} onClick={() => setSelectedComboIndex(idx)}>
{c.join(', ')}
</li>
))}
</ul>
</div>


<div>
<div>Preview de la combinaison sélectionnée</div>
<div className="mt-2">{renderGrid(result.combos[selectedComboIndex])}</div>
</div>
</div>
)}


<div className="mt-6 text-sm text-gray-600">
Remarques: le backend renvoie des index de cellule (0 = top-left). Vous pouvez calculer un hash off-chain
(ex: keccak256) de l'array de positions pour l'enregistrer ensuite sur le contrat Solidity.
</div>
</div>
);
}
