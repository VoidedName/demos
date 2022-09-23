// we can use a color only once
// we can only use rectangles
// is this printable?

// draft?
// detect used rectangles somehow
//
// detect if those rectangles were used in a valid fashion
//      -> no cycle for rectangle of colour X covered by rectangle of colour Y => valid


// map Colour -> Rectanlge
//      iterate over the grid, and update the respective x / y based on discovered colour


data class Rectangle(
    val x1: Int, // top left x
    val y1: Int, // top left y
    val x2: Int, // bottom right x
    val y2: Int // bottom right y
)

fun Rectangle.includes(x: Int, y: Int): Boolean 
    = x1 <= x 
        && x2 >= x 
        && y1 <= y 
        && y2 >= y

fun min(x: Int, y: Int): Int = if (x < y) x else y
fun max(x: Int, y: Int): Int = if (x < y) y else x

fun dFSCycle(graph: Map<Int, Set<Int>>, node: Int, path: ArrayDeque<Int>): Boolean {
    if (node in path) return true
    val children = graph[node] ?: setOf()
    if (children.size == 0) return false
    path.addLast(node)
    val result = children.any { child -> dFSCycle(graph, child, path) }
    path.removeLast()
    return result
}

class Solution {
    fun isPrintable(targetGrid: Array<IntArray>): Boolean {
        // construct all our rectangles
        val rectangles = mutableMapOf<Int, Rectangle>(
            0 to Rectangle(0, 0, targetGrid[0].size, targetGrid.size)
        )
        for (row in 0 until targetGrid.size) {
            for (col in 0 until targetGrid[row].size) {
                val color = targetGrid[row][col]
                val rectangle = rectangles[color] ?: Rectangle(col, row, col, row)
                val expandedRectanlge = Rectangle(
                    min(col, rectangle.x1),
                    min(row, rectangle.y1),
                    max(col, rectangle.x2),
                    max(row, rectangle.y2)
                )
                rectangles[color] = expandedRectanlge
            }
        }
    
        // figure out which rectangle contains other rectangles
        // map Colour -> Set<Colour>
        val isCoveredBy = mutableMapOf<Int, MutableSet<Int>>()
        for (row in 0 until targetGrid.size) {
            for (col in 0 until targetGrid[row].size) {
                val color = targetGrid[row][col]
                rectangles.forEach { (rectangleColour, rectangle) ->
                    if (rectangleColour != color && rectangle.includes(col, row)) {
                        val covered = isCoveredBy[rectangleColour] ?: mutableSetOf()
                        covered.add(color)
                        isCoveredBy[rectangleColour] = covered
                    } 
                }
            }
        }

        // cycle detection left
        // dfs
        
        return !dFSCycle(isCoveredBy, 0, ArrayDeque())
    }
}
