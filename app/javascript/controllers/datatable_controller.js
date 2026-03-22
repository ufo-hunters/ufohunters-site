import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["body", "search", "info", "pagination", "pageSize"]
  static values = {
    sortCol: { type: Number, default: 1 },
    sortDir: { type: String, default: "desc" },
    page: { type: Number, default: 1 },
    perPage: { type: Number, default: 25 }
  }

  connect() {
    this.allRows = Array.from(this.bodyTarget.querySelectorAll("tr"))
    this.filteredRows = [...this.allRows]
    this.sortColValue = this.sortColValue || 1
    this.sortDirValue = this.sortDirValue || "desc"
    this.pageValue = 1
    this.perPageValue = this.hasPageSizeTarget ? parseInt(this.pageSizeTarget.value) : 25
    this._sort(this.sortColValue, this.sortDirValue)
    this._render()
  }

  filter() {
    if (!this.hasSearchTarget) return
    const query = this.searchTarget.value.toLowerCase()
    this.filteredRows = this.allRows.filter(row => row.textContent.toLowerCase().includes(query))
    this.pageValue = 1
    this._render()
  }

  sortBy(event) {
    const th = event.currentTarget
    const col = parseInt(th.dataset.col)
    const currentDir = th.getAttribute("data-dir") || "none"
    const newDir = currentDir === "asc" ? "desc" : "asc"

    this.element.querySelectorAll("thead th").forEach(h => {
      h.setAttribute("data-dir", "none")
      const icon = h.querySelector(".sort-icon")
      if (icon) icon.remove()
    })

    th.setAttribute("data-dir", newDir)
    const icon = document.createElement("span")
    icon.className = "sort-icon ml-1 text-[10px]"
    icon.textContent = newDir === "asc" ? " ▲" : " ▼"
    th.appendChild(icon)

    this._sort(col, newDir)
    this.pageValue = 1
    this._render()
  }

  _sort(col, dir) {
    this.filteredRows.sort((a, b) => {
      const cellA = a.children[col]
      const cellB = b.children[col]
      if (!cellA || !cellB) return 0
      const aVal = cellA.textContent.trim()
      const bVal = cellB.textContent.trim()
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true, sensitivity: "base" })
      return dir === "asc" ? cmp : -cmp
    })
  }

  prevPage() {
    if (this.pageValue > 1) { this.pageValue--; this._render() }
  }

  nextPage() {
    if (this.pageValue < this._totalPages()) { this.pageValue++; this._render() }
  }

  goToPage(event) {
    const page = parseInt(event.currentTarget.dataset.page)
    if (page >= 1 && page <= this._totalPages()) { this.pageValue = page; this._render() }
  }

  changePageSize() {
    if (!this.hasPageSizeTarget) return
    this.perPageValue = parseInt(this.pageSizeTarget.value)
    this.pageValue = 1
    this._render()
  }

  _totalPages() {
    return Math.max(1, Math.ceil(this.filteredRows.length / this.perPageValue))
  }

  _render() {
    const perPage = this.perPageValue
    const start = (this.pageValue - 1) * perPage
    const end = start + perPage
    const visible = this.filteredRows.slice(start, end)

    // Hide all rows, show only current page
    this.allRows.forEach(r => r.style.display = "none")
    visible.forEach(r => { r.style.display = ""; this.bodyTarget.appendChild(r) })

    // Info
    if (this.hasInfoTarget) {
      const total = this.filteredRows.length
      if (total === 0) {
        this.infoTarget.textContent = "NO INTERCEPTS FOUND"
      } else {
        this.infoTarget.textContent = `SHOWING ${start + 1} TO ${Math.min(end, total)} OF ${total} INTERCEPTS`
      }
    }

    // Pagination
    if (this.hasPaginationTarget) {
      this.paginationTarget.innerHTML = this._buildPagination()
    }
  }

  _buildPagination() {
    const total = this._totalPages()
    const current = this.pageValue
    if (total <= 1) return ""

    let html = ""

    // Prev
    html += `<button data-action="datatable#prevPage" class="px-3 py-1.5 rounded text-xs tracking-wider transition-colors ${current <= 1 ? 'opacity-30 cursor-default text-[#c9c8ad]' : 'text-[#dfe2eb] bg-[#262a31] hover:bg-[#31353c] hover:text-[#D7DF21] cursor-pointer'}" ${current <= 1 ? 'disabled' : ''}>&lsaquo;</button>`

    // Pages
    const pages = this._pageNumbers(current, total)
    for (const p of pages) {
      if (p === "...") {
        html += `<span class="px-2 py-1 text-[#c9c8ad] text-xs">…</span>`
      } else {
        const active = p === current
        html += `<button data-action="datatable#goToPage" data-page="${p}" class="px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${active ? 'bg-[#D7DF21] text-[#313300] font-bold' : 'text-[#dfe2eb] bg-[#262a31] hover:bg-[#31353c] hover:text-[#D7DF21]'}">${p}</button>`
      }
    }

    // Next
    html += `<button data-action="datatable#nextPage" class="px-3 py-1.5 rounded text-xs tracking-wider transition-colors ${current >= total ? 'opacity-30 cursor-default text-[#c9c8ad]' : 'text-[#dfe2eb] bg-[#262a31] hover:bg-[#31353c] hover:text-[#D7DF21] cursor-pointer'}" ${current >= total ? 'disabled' : ''}>&rsaquo;</button>`

    return html
  }

  _pageNumbers(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages = [1]
    if (current > 3) pages.push("...")
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
    if (current < total - 2) pages.push("...")
    pages.push(total)
    return pages
  }
}
