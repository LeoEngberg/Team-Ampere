import { describe, it, expect } from 'vitest'
import { statusChipClass } from './statusChip'

describe('statusChipClass', () => {
    it('Betald returns status-betald', () => {
        expect(statusChipClass('Betald')).toBe('status-betald')
    })
    it('Obetald returns status-obetald', () => {
        expect(statusChipClass('Obetald')).toBe('status-obetald')
    }) 

})
