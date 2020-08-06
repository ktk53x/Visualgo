export function bubble_sort(a)
{
    let n = a.length;
    let swaps = [];
    for(let l = 1; l <= n; l++)
    {
        for(let i = 0; i < n - l; i++)
        {
            if(a[i] > a[i+1])
            {
                swaps.push([i, i+1]);
                let temp = a[i+1];
                a[i+1] = a[i];
                a[i] = temp;
            }
        }
    }
    // console.log(a);
    return swaps;
}