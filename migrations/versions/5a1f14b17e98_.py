"""empty message

Revision ID: 5a1f14b17e98
Revises: 
Create Date: 2019-05-29 08:58:46.244780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a1f14b17e98'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('key_map',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=16), nullable=True),
    sa.Column('keys', sa.Text(), nullable=True),
    sa.Column('value', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=16), nullable=True),
    sa.Column('password', sa.String(length=60), nullable=True),
    sa.Column('email', sa.String(length=60), nullable=True),
    sa.Column('phonenumber', sa.String(length=11), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_chat_information',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=16), nullable=True),
    sa.Column('chat_information', sa.Text(), nullable=True),
    sa.Column('recv_information', sa.Text(), nullable=True),
    sa.Column('chat_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_chat_information')
    op.drop_table('user')
    op.drop_table('key_map')
    # ### end Alembic commands ###
