export function createMockActivityRepository(seed) {
  const records = seed.map(record => ({ ...record }));

  return {
    list() {
      return records;
    },
    find(code) {
      return records.find(record => record.code === code) || null;
    },
    create(record) {
      records.unshift(record);
      return record;
    },
    update(code, changes) {
      const record = records.find(item => item.code === code);
      if (!record) throw new Error(`活动不存在：${code}`);
      Object.assign(record, changes);
      return record;
    },
  };
}
