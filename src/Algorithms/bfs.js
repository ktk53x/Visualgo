const dx = [-1, 1, 0,  0];
const dy = [0,  0, 1, -1];

export function bfs(grid, src, dst)
{
    let q = [], n = grid.length, m = grid[0].length;
    const visit_order = [];
    grid[src.row][src.col].dist = 0;
    grid[src.row][src.col].visited = true;
    q.push(grid[src.row][src.col]);
    
    while(q.length)
    {
        let u = grid[q[0].row][q[0].col];
       
        q.shift();
        // console.log(u);
        visit_order.push(u);
        if(u.row === dst.row && u.col === dst.col)
        {
            for(let i = 0; i < n; i++)
            {
                for(let j = 0; j < m; j++)
                {
                    grid[i][j].visited = false;
                }
            }
            return visit_order;
        }
        for(let k = 0; k < 4; k++)
        {
            let x = u.row + dx[k], y = u.col + dy[k];
            if(x < n && x >= 0 && y < m && y >= 0)
            {
                if(!grid[x][y].blocked && !grid[x][y].visited)
                {
                    q.push(grid[x][y]);
                    grid[x][y].visited = true;
                    grid[x][y].dist = grid[u.row][u.col].dist + 1;
                    grid[x][y].pred = grid[u.row][u.col];
                }
            }
        }
    }
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < m; j++)
        {
            grid[i][j].visited = false;
        }
    }
    return visit_order;
}