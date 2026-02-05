import { createGlobalStyle } from 'styled-components';

import { theme } from '../Theme';
import { boxShadow } from './Mixin';

export const Common = createGlobalStyle`

.container-fluid {
    width: 100%;
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
}

.container {
    width: 100%;
    max-width: 1230px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;

    &.lg {
        width: 1290px;
    }

    &.md {
        width: 908px;
    }
}

.shadow-paper {
	height: 100%;
	background: ${theme.color.white};
	padding: 20px;
	border-radius: 10px;
    ${boxShadow('10px 10px 20px 5px rgba(0, 0, 0, 0.05)')}

	&.auto-height {
		height: auto;
	}

	.shadow-paper-scroll {
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		margin: 0 -20px;
		padding: 0 20px;
	}

	+.shadow-paper {
		margin-top: 20px;
	}

    &.no-bg{
        background-color: transparent;
    }

    &.pad-sm{
        padding: 10px 20px;
    }

    &.pad-md{
        padding: 15px 20px;
    }

	&.no-padd {
		padding: 0;
	}

	.heading-row {
		padding: 20px 0;
	}
}

/* Text Alignment */
.text-center {
    text-align: center;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

/* Text Colors */
.text-success {
    color: ${theme.color.success};
}

.text-danger {
    color: ${theme.color.danger};
}

.text-warning {
    color: ${theme.color.warning};
}

.text-info {
    color: ${theme.color.light};
}

/* Width & Height */
.w-100 {
    width: 100%;
}

.max-w-100 {
    max-width: 100%;
}

.h-100 {
    height: 100%;
}

.h-100vh {
    min-height: 100vh;
}

.h-auto {
    height: auto;
}

.border-sm{
    border-radius: 5px !important; 
    * { border-radius: inherit !important;}
}
.border-md{
    border-radius: 20px !important; 
    * { border-radius: inherit !important;}
}
.border-lg{
    border-radius: 12px !important; 
    * { border-radius: inherit !important;}
}

.border-full {
    border-radius: 50%;
}

.m-auto {
    margin: 0 auto;
}

.card-padding {
    padding: 40px 73px;
}
`;
