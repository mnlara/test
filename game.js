kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
})

const MOVE_SPEED = 120

loadRoot('https://i.imgur.com/')
loadSprite('link-left', 'gPl0s7R.png' )
loadSprite('link-right', 'u8yNyms.png' )
loadSprite('link-down', 'ofcZP1G.png' )
loadSprite('link-up', 'GVSz9Aw.png' )
loadSprite('left-wall', '513ELBL.png' )
loadSprite('top-wall', 'JnLZV4p.png' )
loadSprite('bottom-wall', 'lhh2dvm.png' )
loadSprite('right-wall', 'rOiJq9r.png' )
loadSprite('bottom-left-corner', 'txJDRzY.png' )
loadSprite('bottom-right-corner', 'bvplabW.png' )
loadSprite('top-left-corner', '7tMjEkc.png' )
loadSprite('top-right-corner', 'xsKifvS.jpg' )
loadSprite('top-door', '13p4kAw.png' )
loadSprite('left-door', 'GjPMo2j.png' )
loadSprite('fire-pot', 'ejuYkNn.png' )
loadSprite('lanterns', '0UGElKw.png' )
loadSprite('slicer', 'mmbXznB.png' )
loadSprite('skeletor', 'DDQpT3t.png' )
loadSprite('kaboom', 'fV99Kd3.png' )
loadSprite('stairs', 'pR8d76N.png' )
loadSprite('bg', 'lO7Wq2M.png' )

scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const maps = [
        [
            'qww%ww^wwe',
            'a        d',
            'a      * d',
            'a    &   d',
            '!        d',
            'a    &   d',
            'a   *    d',
            'a        d',
            'zxx%xx%xxc',  
        ],
        [
            'qwwwwwwwwe',
            'a        d',
            '%        %',
            'a        d',
            'a        d',
            'a    ^   d',
            '%   $    %',
            'a        d',
            'zxxxxxxxxc',
        ],
        
    ]

    const levelCfg = {
        width: 48,
        height: 48,
        'a': [sprite('left-wall'), solid()],
        'd': [sprite('right-wall'), solid()],
        'w': [sprite('top-wall'), solid()],
        'x': [sprite('bottom-wall'), solid()],
        'q': [sprite('top-left-corner'), solid()],
        'e': [sprite('top-right-corner'), solid()],
        'z': [sprite('bottom-left-corner'), solid()],
        'c': [sprite('bottom-right-corner'), solid()],
        '!': [sprite('left-door'), solid()],
        '@': [sprite('top-door'), 'next-level'],
        '^': [sprite('stairs'), 'next-level'],
        '*': [sprite('slicer'), 'slicer', { dir: -1 }],
        '$': [sprite('skeletor') ],
        '%': [sprite('lanterns'), solid()],
        '&': [sprite('fire-pot'), solid()],
    }
    addLevel(maps[level], levelCfg)

    add(sprite[('bg'), layer('bg')])

    const scoreLabel = add([
        text('0'),
        pos(400, 450),
        layer('ui'),
        {
            value: score,
        },
        scale(2)
    ])

    add([
        text('level ' + parseInt(level + 1)),
        pos(400, 485),
        scale(2)
    ])

    const player = add([
        sprite('link-right'),
        pos(5, 190),
        {
            dir: vec2(1, 0)
        }
    ])

    player.action(() => {
        player.resolve()
    })

    player.overlaps('next-level', () => {
        go("game", {
            level: (level + 1) % maps.length,
            score: scoreLabel.value
        })
    })


    // directions and keybind
    keyDown('left', () => {
        player.changeSprite('link-left')
        player.move(-MOVE_SPEED, 0)
        player.dir = vec2(-1, 0)
    })

    keyDown('right', () => {
        player.changeSprite('link-right')
        player.move(MOVE_SPEED, 0)
        player.dir = vec2(1, 0)
    })

    keyDown('up', () => {
        player.changeSprite('link-up')
        player.move(0, -MOVE_SPEED)
        player.dir = vec2(0, -1)
    })

    keyDown('down', () => {
        player.changeSprite('link-down')
        player.move(0, MOVE_SPEED)
        player.dir = vec2(0, 1)
    })

    const SLICER_SPEED = 100

    action('slicer', (s) => {
        s.move(s.dir * SLICER_SPEED, 0)
    })
})

start("game", { level: 0, score:0 })