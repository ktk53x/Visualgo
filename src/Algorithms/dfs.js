const dx = [-1, 1, 0,  0];
const dy = [0,  0, 1, -1];

function dfs_helper(grid, src, dst, n, m, visit_order)
{
    let flag = false;
    visit_order.push(grid[src.row][src.col]);
    if(src.row === dst.row && src.col === dst.col)
    {
        flag = true;
        return flag;
    }
    grid[src.row][src.col].visited = true;
    for(let k = 0; k < 4; k++)
    {
        let x = src.row + dx[k], y = src.col + dy[k];
        if(x < n && x >= 0 && y < m && y >= 0)
        {
            if(!grid[x][y].blocked && !grid[x][y].visited)
            {
                grid[x][y].pred = grid[src.row][src.col];
                flag = flag || dfs_helper(grid, grid[x][y], dst, n, m, visit_order);
            }
        }
        if(flag)
            return flag;
    }
    return flag;
}

export function dfs(grid, src, dst)
{
    let n = grid.length, m = grid[0].length;
    const visit_order = [];

    dfs_helper(grid, src, dst, n, m, visit_order);

    for(let i = 0; i < visit_order.length; i++)
        console.log(visit_order[i]);

    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < m; j++)
        {
            grid[i][j].visited = false;
        }
    }
    return visit_order;
}