const FINGER_MAP = [
    0, 1, 2, 3, 3, 6, 6, 7, 8, 9,
    0, 1, 2, 3, 3, 6, 6, 7, 8, 9,
    0, 1, 2, 3, 3, 6, 6, 7, 8, 9,
]

function finger(idx) {
    return FINGER_MAP[idx]
}

function column(idx) {
    return idx % 10
}

function hand(idx) {
    if (idx % 10 < 5) {
        return 0
    } else {
        return 1
    }
}

function row(idx) {
    return Math.floor(idx / 10)
}

function ordered(idx) {
    return (
        (
            finger(idx[0]) < finger(idx[1]) &&
            finger(idx[1]) < finger(idx[2])
        ) ||
        (
            finger(idx[0]) > finger(idx[1]) &&
            finger(idx[1]) > finger(idx[2])
        )
    )
}

export function classify(key) {
    switch(key.length) {
        case 2:
            return bigrams(key)
        case 3:
            return trigrams(key)
    }
}

function bigrams(key) {
    const buckets = []

    if (
        finger(key[0]) == finger(key[1]) &&
        key[0] != key[1]
    ) {
        buckets.push('SF')
    }
    
    if (
        hand(key[0]) == hand(key[1]) &&
        (
            [4, 5].includes(column(key[0])) ||
            [4, 5].includes(column(key[1]))
        ) &&
        (
            [2, 7].includes(column(key[0])) ||
            [2, 7].includes(column(key[1]))
        )
    ) {
        buckets.push('LS')
    }

    if (
        (
            row(key[0]) - row(key[1]) == -1 &&
            hand(key[0]) == hand(key[1]) &&
            [1, 2, 7, 8].includes(finger(key[1]))
        ) ||
        (
            row(key[0]) - row(key[1]) == 1 &&
            hand(key[0]) == hand(key[1]) &&
            [1, 2, 7, 8].includes(finger(key[0]))
        )
    ) {
        buckets.push('HS')
    }

    if (
        (
            row(key[0]) - row(key[1]) == -2 &&
            hand(key[0]) == hand(key[1]) &&
            [1, 2, 7, 8].includes(finger(key[1]))
        ) ||
        (
            row(key[0]) - row(key[1]) == 2 &&
            hand(key[0]) == hand(key[1]) &&
            [1, 2, 7, 8].includes(finger(key[0]))
        )
    ) {
        buckets.push('FS')
    }

    return buckets
}

function trigrams(key) {
    const buckets = []

    if (
        hand(key[0]) == hand(key[2]) &&
        hand(key[0]) != hand(key[1])
    ) {
        buckets.push('ALT')
    }

    if (
        new Set(key.map(x => hand(x))).size == 2 &&
        hand(key[0]) != hand(key[2])
    ) {
        buckets.push('ROL')
    }

    if (
        new Set(key.map(x => hand(x))).size == 1 &&
        ordered(key)
    ) {
        buckets.push('ONE')
    }

    if (
        new Set(key.map(x => hand(x))).size == 1 &&
        new Set(key.map(x => finger(x))).size == 3 &&
        !ordered(key)
    ) {
        buckets.push('RED')
    }

    return buckets
}