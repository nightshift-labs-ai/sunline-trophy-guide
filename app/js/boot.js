// SUNLINE boot (first cut): load the trophy list and show the header and a plain list.
export async function bootSunline() {
  const doc = await (await fetch("data/trophies.json")).json();
  const list = document.getElementById("trophy-list");
  document.getElementById("makeup").textContent = `${doc.trophies.length} official trophies`;
  for (const t of doc.trophies) {
    const li = document.createElement("li");
    li.className = "row";
    li.textContent = `${t.name} · ${t.grade} · ${t.description}`;
    list.append(li);
  }
  document.body.dataset.ready = "1";
}

bootSunline();
