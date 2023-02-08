
export function GlobalSearchInput() {
  return (
    <form class="w-full px-4">
      <div class="flex">
        <input
          class="input bg-x-white w-full text-x-dark-green mr-3 py-1 px-2 rounded"
          type="text"
          placeholder="Search ..." />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          <i class="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
}
