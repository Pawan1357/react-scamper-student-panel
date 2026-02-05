import { createGlobalStyle } from 'styled-components';

import { responsive } from './Mixin';

export const Flex = createGlobalStyle`
.d-table {
    display: table;
}

.d-block {
    display: block;
}

.d-none {
    display: none !important;
}

.d-inline-block {
    display: inline-block;
}

.d-grid {
    display: grid;
}

.d-table-row {
    display: table-row;
}

.d-table-cell {
    display: table-cell;
}

.d-table-column {
    display: table-column;
}

/*--- Flex ---*/
.d-flex {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
}

.flex-wrap {
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}

.flex-nowrap {
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
}

.align-items-start {
    -ms-flex-align: start;
    -webkit-box-align: start;
    align-items: flex-start;
}

.align-items-center {
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
}

.align-items-end {
    -ms-flex-align: end;
    -webkit-box-align: end;
    align-items: flex-end;
}

.align-items-baseline {
    -ms-flex-align: baseline;
    align-items: baseline;
}

.align-items-stretch {
    -ms-flex-align: stretch;
    align-items: stretch;
}

.align-content-start {
    -ms-flex-line-pack: start;
    align-content: flex-start;
}

.align-content-center {
    -ms-flex-line-pack: center;
    align-content: center;
}

.align-content-end {
    -ms-flex-line-pack: end;
    align-content: flex-end;
}

.align-content-between {
    -ms-flex-line-pack: justify;
    align-content: space-between;
}

.align-content-around {
    -ms-flex-line-pack: distribute;
    align-content: space-around;
}

.align-self-start {
    -ms-flex-item-align: start;
    align-self: start;
}

.align-self-center {
    -ms-flex-item-align: center;
    align-self: center;
}

.align-self-end {
    -ms-flex-item-align: end;
    align-self: end;
}

.align-self-baseline {
    -ms-flex-item-align: baseline;
    align-self: baseline;
}

.align-self-stretch {
    -ms-flex-item-align: stretch;
    align-self: stretch;
}

.justify-content-start {
    -ms-flex-pack: start;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.justify-content-center {
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    justify-content: center;
}

.justify-content-end {
    -ms-flex-pack: end;
    -webkit-box-pack: end;
    justify-content: flex-end;
}

.justify-content-between {
    -ms-flex-pack: justify;
    -webkit-box-pack: justify;
    justify-content: space-between;
}

.justify-content-around {
    -ms-flex-pack: distribute;
    -webkit-box-pack: distribute;
    justify-content: space-around;
}

.flex-column {
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    flex-direction: column;
}

.flex-row {
    -ms-flex-direction: row;
    -webkit-box-direction: horizontal;
    flex-direction: row;
}

.flex-row-reverse {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
}

.flex-column-reverse {
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
}

.flex-column,
.flex-row {
    -webkit-box-direction: normal;
}

.flex-1 {
    -ms-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
}

.flex-none {
    flex: none;
    -webkit-flex: none;
}

/* Flex gap utilities */
.flex-gap-4 {
  display: flex;
  gap: 4px;
}

.flex-gap-8 {
  display: flex;
  gap: 8px;
}

.flex-gap-12 {
  display: flex;
  gap: 12px;
}

.flex-gap-16 {
  display: flex;
  gap: 16px;
}

.flex-gap-20 {
  display: flex;
  gap: 20px;
}

.flex-gap-24 {
  display: flex;
  gap: 24px;
}

.flex-gap-32 {
  display: flex;
  gap: 32px;
}


${responsive('lg')`
    .sm-flex-row-reverse {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse;
    }

    .sm-justify-content-between {
        -ms-flex-pack: justify;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }
`}

`;
