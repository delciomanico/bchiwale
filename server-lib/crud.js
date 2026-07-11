import { sql } from './db.js';

function toColumnValue(config, col, raw) {
  return config.jsonColumns.includes(col) ? JSON.stringify(raw ?? null) : raw;
}

export async function listRows(config) {
  return sql(`SELECT * FROM ${config.table} ORDER BY ${config.orderColumn}`, []);
}

export async function getRow(config, id) {
  const rows = await sql(`SELECT * FROM ${config.table} WHERE ${config.idColumn} = $1`, [id]);
  return rows[0] || null;
}

export async function createRow(config, body) {
  const cols = [];
  const placeholders = [];
  const values = [];

  if (config.idIsText) {
    const idValue = body[config.idColumn];
    if (!idValue) {
      throw Object.assign(new Error(`${config.idColumn} is required`), { status: 400 });
    }
    cols.push(config.idColumn);
    values.push(idValue);
    placeholders.push(`$${values.length}`);
  }

  for (const col of config.columns) {
    if (!(col in body)) continue;
    cols.push(col);
    values.push(toColumnValue(config, col, body[col]));
    placeholders.push(`$${values.length}`);
  }

  if (!cols.length) {
    throw Object.assign(new Error('No fields provided'), { status: 400 });
  }

  const text = `INSERT INTO ${config.table} (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;
  const rows = await sql(text, values);
  return rows[0];
}

export async function updateRow(config, id, body) {
  const sets = [];
  const values = [];

  for (const col of config.columns) {
    if (!(col in body)) continue;
    values.push(toColumnValue(config, col, body[col]));
    sets.push(`${col} = $${values.length}`);
  }

  if (!sets.length) {
    const existing = await getRow(config, id);
    if (!existing) throw Object.assign(new Error('Not found'), { status: 404 });
    return existing;
  }

  sets.push('updated_at = now()');
  values.push(id);
  const text = `UPDATE ${config.table} SET ${sets.join(', ')} WHERE ${config.idColumn} = $${values.length} RETURNING *`;
  const rows = await sql(text, values);
  if (!rows[0]) throw Object.assign(new Error('Not found'), { status: 404 });
  return rows[0];
}

export async function deleteRow(config, id) {
  const rows = await sql(`DELETE FROM ${config.table} WHERE ${config.idColumn} = $1 RETURNING *`, [id]);
  if (!rows[0]) throw Object.assign(new Error('Not found'), { status: 404 });
  return rows[0];
}
